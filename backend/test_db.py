from db_config import get_db_connection

try:
    conn = get_db_connection()
    if conn.is_connected():
        print("✅ Successfully connected to MySQL!")
    else:
        print("❌ Connection failed!")
except Exception as e:
    print("❌ Error:", str(e))
finally:
    if conn:
        conn.close()
