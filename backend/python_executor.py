import time
import threading
import pandas as pd
import scipy
import io
import contextlib

class TimeoutException(Exception):
    pass

class Executor:
    def __init__(self, timeout=2):
        self.timeout = timeout

    def execute(self, code: str) -> dict:
        def run_code():
            nonlocal result
            try:
                restricted_globals = {
                    "__builtins__": {
                        "print": print,
                        "len": len,
                        "range": range,
                        "int": int,
                        "str": str,
                        "float": float,
                        "list": list,
                        "dict": dict,
                        "set": set,
                        "tuple": tuple,
                        # Add other safe built-ins as needed
                    },
                    "pd": pd,
                    "scipy": scipy,
                }
                restricted_locals = {}

                # Capture stdout and stderr
                stdout = io.StringIO()
                stderr = io.StringIO()

                with contextlib.redirect_stdout(stdout), contextlib.redirect_stderr(stderr):
                    start_time = time.time()
                    exec(code, restricted_globals, restricted_locals)
                    end_time = time.time()

                result = {
                    "output": str(restricted_locals),
                    "stdout": stdout.getvalue(),
                    "stderr": stderr.getvalue(),
                    "execution_time": str(end_time - start_time)
                }
            except Exception as e:
                result = {"error": str(e)}

        result = {}
        thread = threading.Thread(target=run_code)
        thread.start()
        thread.join(self.timeout)

        if thread.is_alive():
            return {"error": "Code execution timed out"}

        return result

if __name__ == "__main__":
    # Example usage
    executor = Executor(timeout=5)
    code = """
sum = 10
print(sum)
    """
    output = executor.execute(code)
    print(output)
