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

  - React with Vite/Next.js
  - TypeScript
  - Tailwind CSS
  - Code Editor from preferred npm library

- **Backend**:
  - FastAPI
  - Python 3.11+
  - SQL Database
  - Secure code execution environment

### Video Demonstration

[![Video Demo](https://img.youtube.com/vi/VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID_HERE)

> _Upload your demo video and update the link above._

### Project Structure

The project is organized into a frontend and backend directory, ensuring a clear separation of concerns. Type hints and comments are used throughout the codebase to enhance readability and maintainability.

- **frontend/**: Contains the React application with TypeScript and Tailwind CSS.
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
