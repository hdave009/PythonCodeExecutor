import sqlite3
import os
import uuid

class CodeDatabase:
    """Class to interact with a SQLite3 database to persist code and execution results."""

    def __init__(self, db_name="code_database.db"):
        """
        Initialize the CodeDatabase class.

        Args:
            db_name (str): The name of the SQLite database file.
        """
        self.db_name = db_name
        self._create_database_and_table()

    def _create_database_and_table(self):
        """Create the database and Code table if they do not exist."""
        conn = sqlite3.connect(self.db_name)
        cursor = conn.cursor()

        cursor.execute("""
        CREATE TABLE IF NOT EXISTS Code (
            id TEXT PRIMARY KEY,
            code TEXT NOT NULL,
            execution TEXT NOT NULL
        )
        """)
        conn.commit()
        conn.close()

    def persist_code(self, code: str, execution: str):
        """
        Persist the code and execution results into the database.

        Args:
            code (str): The code to be saved.
            execution (str): The execution result to be saved.
        """
        conn = sqlite3.connect(self.db_name)
        cursor = conn.cursor()

        code_id = str(uuid.uuid4())
        cursor.execute("""
        INSERT INTO Code (id, code, execution) VALUES (?, ?, ?)
        """, (code_id, code, execution))

        conn.commit()
        conn.close()

