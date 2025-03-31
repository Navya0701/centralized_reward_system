import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="navbar">
      <h1 onClick={() => navigate("/")}>Creator Platform</h1>

      {!isAuthenticated ? (
        <div className="auth-buttons">
          <button onClick={() => navigate("/login")} className="login-btn">
            Log in
          </button>
          <button onClick={() => navigate("/signup")} className="signup-btn">
            Sign up
          </button>
        </div>
      ) : (
        <div className="profile-container">
          {/* Profile Button */}
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="profile-btn"
          >
            <img src={user.picture} alt="Profile" className="profile-pic" />
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="profile-dropdown">
              <p>{user.name}</p>
              <button
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
