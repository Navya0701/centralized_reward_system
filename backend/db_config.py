import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()  # ✅ Load environment variables from .env

def get_db_connection():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST", "localhost"),
        user=os.getenv("DB_USER", "root"),
        password=os.getenv("DB_PASSWORD", "Navya@0705"),
        database=os.getenv("DB_NAME", "mern")  # ✅ Ensure database is correct
    )
