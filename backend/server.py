from fastapi import FastAPI
from pydantic import BaseModel
import subprocess

app = FastAPI()

class Code(BaseModel):
    code: str

@app.post("/test-code")
def test_code(code: Code): 
    print(code.code)