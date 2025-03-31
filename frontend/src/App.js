import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Upload from "./pages/Upload"; // ✅ Import Upload page
import Login from "./components/login/login";
import Signup from "./components/signup/signup";

import "./App.css";

function App() {
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && user) {
      console.log("🔍 Auth0 User Data:", user); // ✅ Check if user data is available

      fetch("http://127.0.0.1:5000/api/save-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          sub: user.sub, // This is the Auth0Id
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log("✅ Server Response:", data)) // ✅ Check API response
        .catch((err) => console.error("❌ API Error:", err));
    }
  }, [user, isAuthenticated]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/upload" element={<Upload />} /> {/* ✅ Add Upload route */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
