const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const app = express();

// ✅ Use CORS properly
app.use(cors({
    origin: "http://localhost:3000", // Allow frontend requests
    credentials: true // Allow cookies & authentication headers
}));

app.use(express.json()); // Middleware to parse JSON

// ✅ MySQL Database Configuration
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root", // Your MySQL username
  password: process.env.DB_PASSWORD || "Navya@0705", // Your MySQL password
  database: process.env.DB_NAME || "mern", // Your MySQL database name
  port: process.env.DB_PORT || 3306, // MySQL default port
});

// ✅ Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("❌ DB Connection Failed:", err);
  } else {
    console.log("✅ Connected to MySQL");
  }
});

// ✅ API to Save User Data from React (Auth0)
app.post("/api/save-user", (req, res) => {
  const { name, email, sub } = req.body;

  if (!name || !email || !sub) {
    console.error("❌ Missing fields:", { name, email, sub });
    return res.status(400).json({ error: "Missing required fields" });
  }

  console.log("📡 Received Data:", { name, email, sub });

  // ✅ Corrected SQL Query
  const query = `
    INSERT INTO users (Auth0Id, Name, Email, last_login)
    VALUES (?, ?, ?, NOW())
    ON DUPLICATE KEY UPDATE Name = VALUES(Name), Email = VALUES(Email), last_login = NOW();
  `;

  db.query(query, [sub, name, email], (err, result) => {
    if (err) {
      console.error("❌ Error saving user:", err);
      return res.status(500).json({ error: err.message });
    }
    console.log("✅ User saved successfully!");
    res.json({ message: "User saved successfully!" });
  });
});

// ✅ API to Get All Users
app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("❌ Error fetching users:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
