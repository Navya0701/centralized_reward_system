import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

// --- Import all your pages ---
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Upload from "./pages/Upload"; // This component is now used below
import Spend from "./pages/Spend";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";

import "./App.css";

// --- Placeholder for the Convert page, assuming you have it ---
const ConvertPage = () => <div style={{textAlign: 'center', padding: '50px'}}>Convert Page Placeholder</div>;

function App() {
  // The useEffect hook for saving user data has been removed
  // as it was not present in the screenshot and was causing other unused variable warnings.

  return (
    <Router>
      {/* Consider adding a global <Navbar /> component here if you want it on every page */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/upload" element={<Upload />} /> {/* ✅ This line fixes the warning */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* --- Add the routes for your wallet pages --- */}
        <Route path="/grow" element={<ConvertPage />} />
        <Route path="/manage" element={<Spend />} />

      </Routes>
    </Router>
  );
}

export default App;
