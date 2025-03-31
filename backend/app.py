from flask import Flask, jsonify, request
from flask_cors import CORS
from db_config import get_db_connection  # Import database connection function

app = Flask(__name__)

# ✅ Allow frontend requests (with credentials support)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

@app.route('/')
def home():
    return "Welcome to the creator platform!"

# ✅ Fetch all users from the database
@app.route('/api/users', methods=['GET'])
def get_users():
    try:
        with get_db_connection() as conn:
            with conn.cursor(dictionary=True) as cursor:
                cursor.execute("SELECT * FROM users")
                users = cursor.fetchall()
                return jsonify(users)
    except Exception as e:
        return jsonify({"error": "Failed to fetch users", "details": str(e)}), 500

# ✅ Save or update user login details
@app.route('/api/save-user', methods=['POST'])
def save_user():
    data = request.json
    if not data:
        return jsonify({"error": "No data received"}), 400

    name = data.get("name")
    email = data.get("email")
    auth0id = data.get("sub")

    if not name or not email or not auth0id:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                query = """
                    INSERT INTO users (Auth0Id, Name, Email, last_login)
                    VALUES (%s, %s, %s, NOW())
                    ON DUPLICATE KEY UPDATE Name = VALUES(Name), Email = VALUES(Email), last_login = NOW();
                """
                cursor.execute(query, (auth0id, name, email))
                conn.commit()
                return jsonify({"message": "User saved successfully!"})
    except Exception as e:
        return jsonify({"error": "Failed to save user", "details": str(e)}), 500

# ✅ Update user details (Name or Email)
@app.route('/api/users/<auth0id>', methods=['PUT'])
def update_user(auth0id):
    data = request.json
    name = data.get("name")
    email = data.get("email")

    if not name or not email:
        return jsonify({"error": "Missing fields"}), 400

    try:
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute("UPDATE users SET Name = %s, Email = %s WHERE Auth0Id = %s", (name, email, auth0id))
                conn.commit()
                return jsonify({"message": "User updated successfully!"})
    except Exception as e:
        return jsonify({"error": "Failed to update user", "details": str(e)}), 500

# ✅ Delete a user
@app.route('/api/users/<auth0id>', methods=['DELETE'])
def delete_user(auth0id):
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute("DELETE FROM users WHERE Auth0Id = %s", (auth0id,))
                conn.commit()
                return jsonify({"message": "User deleted successfully!"})
    except Exception as e:
        return jsonify({"error": "Failed to delete user", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
