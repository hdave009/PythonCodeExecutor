from code_database import CodeDatabase
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from python_executor import Executor

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Define Pydantic model for incoming request body
class Code(BaseModel):
    code: str


# Endpoint to test the code
@app.post("/test")
def test(code: Code):
    """
    Endpoint to execute provided code for testing.
    Args:
        code (Code): A Pydantic model containing the code to be executed.
    Returns:
        dict: The result of the code execution including stdout, stderr, and execution time.
    Raises:
        HTTPException: If an error occurs during code execution, a 400 status code is returned with the error detail.
    """
    result = Executor(timeout=5).execute(code.code)  # Execute the code with a 5-second timeout
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])  # Raise an HTTP 400 error if execution fails
    return result  # Return the execution result


# Endpoint to submit the code
@app.post("/submit")
def submit(code: Code):
    """
    Endpoint to execute provided code for submission.
    Args:
        code (Code): A Pydantic model containing the code to be executed.
    Returns:
        dict: The result of the code execution including stdout, stderr, and execution time.
    Raises:
        HTTPException: If an error occurs during code execution, a 400 status code is returned with the error detail.
    """
    result = Executor(timeout=5).execute(code.code)  # Execute the code with a 5-second timeout

    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])  # Raise an HTTP 400 error if execution fails
    else:
        # Persist code and execution to database
        code_database = CodeDatabase()
        code_database.persist_code(code.code, str(result))

    return result
