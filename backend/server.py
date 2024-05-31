from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from python_executor import Executor

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Code(BaseModel):
    code: str

@app.post("/test")
def test(code: Code):
    result = Executor(timeout=5).execute(code.code)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@app.post("/submit")
def submit(code: Code):
    result = Executor(timeout=5).execute(code.code)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result
