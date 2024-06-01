# Online Python Executor

## Description

Welcome to the Code Execution Website, a platform that allows users to write, test, and submit Python 3 code in an online editor. This project provides a seamless code execution experience.

### Features

- **Interactive Code Editor**: Users can write Python 3 code in an integrated code editor built with Next.js, React, TypeScript, and Tailwind CSS. The editor supports syntax highlighting and auto-completion.
- **Execute Code**: The "Test Code" button allows users to execute their Python code and see the results in real-time.
- **Submit Code**: The "Submit" button validates the user code, ensuring it runs without errors, and then persists the code and its output to a database.
- **Backend with FastAPI**: The backend, built with FastAPI, handles code execution, validation, and database interactions. It ensures efficient and secure processing of user code.
- **SQL Database Integration**: The platform uses a SQL database to store user code and execution results, providing a reliable and scalable solution for data persistence.

### Technology Stack

- **Frontend**:

  - React with Next.js
  - TypeScript
  - Monaco-Editor

- **Backend**:
  - FastAPI
  - Python 3.11+
  - SQLite

### Video Demonstration

https://github.com/hdave009/PythonCodeExecutor/assets/39701217/fd42a682-e6a9-4ad7-8648-c0b8b1c80a30

### Project Structure

The project is organized into a frontend and backend directory, ensuring a clear separation of concerns. Type hints and comments are used throughout the codebase to enhance readability and maintainability.

- **frontend/**: Contains the React application with TypeScript.
- **backend/**: Contains the FastAPI application with Python code for handling requests and executing user-submitted code.

Explore the repository to understand the implementation details and the workflow of the code execution platform.

---

This project is designed to provide a robust and secure environment for executing Python code online. Feel free to contribute or raise issues if you encounter any problems.

For more details, check the individual README files in the `frontend` and `backend` directories.

### Available Built-ins and Libraries

When you submit code to the Code Execution Website, you can utilize the following built-ins and libraries within the restricted execution environment:

#### Built-in Functions

- **Basic Functions**:

  - `print`
  - `len`
  - `range`
  - `int`
  - `str`
  - `float`
  - `list`
  - `dict`
  - `set`
  - `tuple`
  - `abs`
  - `all`
  - `any`
  - `bin`
  - `bool`
  - `bytearray`
  - `bytes`
  - `callable`
  - `chr`
  - `complex`
  - `divmod`
  - `enumerate`
  - `filter`
  - `format`
  - `frozenset`
  - `hash`
  - `hex`
  - `id`
  - `isinstance`
  - `issubclass`
  - `iter`
  - `map`
  - `max`
  - `min`
  - `next`
  - `oct`
  - `ord`
  - `pow`
  - `repr`
  - `reversed`
  - `round`
  - `slice`
  - `sorted`
  - `sum`
  - `zip`

- **Advanced Functions**:
  - `__import__`

#### Libraries

- **pandas**: Imported as `pandas`
- **scipy**: Imported as `scipy`
- **math**: Provides mathematical functions
- **json**: For parsing JSON data
- **statistics**: For statistical calculations
- **random**: For generating random numbers
- **string**: For common string operations
- **datetime**: For manipulating dates and times
- **functools**: For higher-order functions and operations on callable objects
- **itertools**: For creating iterators for efficient looping
- **numpy**: Imported as `np`

You can use these built-ins and libraries to enhance your code and perform a variety of operations within the safe execution environment provided by the platform.

### Setup Locally

Follow these steps to set up the project locally on your machine:

Clone the repository:

```bash
git clone https://github.com/hdave009/PythonCodeExecutor.git
```

Navigate to the cloned repository:

```bash
cd PythonCodeExecutor
```

Start the frontend:

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

In another terminal, navigate to the backend directory:

Open a new terminal window and navigate to the backend directory:

```bash
cd PythonCodeExecutor/backend
```

Set up the virtual environment:

Run the setup script to create a virtual environment:

```bash
./setup_venv.sh
```

Activate the virtual environment:

```bash
source venv/bin/activate
```

Start the backend server:

```bash
uvicorn server:app
```

By following these steps, you will have both the frontend and backend servers running locally on your machine.
