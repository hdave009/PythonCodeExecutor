import time
import threading
import pandas as pd
import scipy
import io
import contextlib
import math
import json
import statistics
import random
import string
import datetime
import functools
import itertools
import numpy as np


class TimeoutException(Exception):
    """Custom exception to handle code execution timeouts."""
    pass


class Executor:
    """Executor class to safely execute arbitrary Python code in a restricted environment."""

    def __init__(self, timeout=2):
        """
        Initialize the Executor with a specified timeout.
        Args:
            timeout (int): Maximum time in seconds to allow for code execution.
        """
        self.timeout = timeout

    def execute(self, code: str) -> dict:
        """
        Execute the provided Python code within a restricted environment.
        Args:
            code (str): The Python code to be executed.
        Returns:
            dict: A dictionary containing the output, stdout, stderr, and execution time, or an error message.
        """

        def run_code():
            nonlocal result
            try:
                # Restricted environment
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
                        "abs": abs,
                        "all": all,
                        "any": any,
                        "bin": bin,
                        "bool": bool,
                        "bytearray": bytearray,
                        "bytes": bytes,
                        "callable": callable,
                        "chr": chr,
                        "complex": complex,
                        "divmod": divmod,
                        "enumerate": enumerate,
                        "filter": filter,
                        "format": format,
                        "frozenset": frozenset,
                        "hash": hash,
                        "hex": hex,
                        "id": id,
                        "isinstance": isinstance,
                        "issubclass": issubclass,
                        "iter": iter,
                        "map": map,
                        "max": max,
                        "min": min,
                        "next": next,
                        "oct": oct,
                        "ord": ord,
                        "pow": pow,
                        "repr": repr,
                        "reversed": reversed,
                        "round": round,
                        "slice": slice,
                        "sorted": sorted,
                        "sum": sum,
                        "zip": zip,
                        "__import__": __import__,
                    },
                    "pandas": pd,
                    "scipy": scipy,
                    "math": math,
                    "json": json,
                    "statistics": statistics,
                    "random": random,
                    "string": string,
                    "datetime": datetime,
                    "functools": functools,
                    "itertools": itertools,
                    "numpy": np
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

