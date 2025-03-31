import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Home.css";

function Home() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">CreatorPlatform</div>
        <ul className="nav-links">
          <li><a href="/explore">Explore</a></li>
          <li><a href="/grow">Grow</a></li>
          <li><a href="/manage">Manage</a></li>
          <li><a href="/resources">Resources</a></li>
        </ul>

        {/* Authentication Buttons */}
        <div className="auth-buttons">
          {!isAuthenticated ? (
            <>
              <button onClick={() => loginWithRedirect()} className="btn login-btn">Login</button>
              <button onClick={() => loginWithRedirect()} className="btn signup-btn">Sign Up</button>
            </>
          ) : (
            <div className="profile-section">
              {/* Profile Icon */}
              <button className="profile-btn" onClick={() => setShowDropdown(!showDropdown)}>
                <img src={user.picture} alt="Profile" className="profile-icon" />
              </button>

              {/* Dropdown Menu - Only Show When Clicked */}
              {showDropdown && (
                <div className="profile-dropdown">
                  <p>{user.name}</p>
                  <button onClick={() => logout({ returnTo: window.location.origin })} className="logout-btn">
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Unleash Your Creativity</h1>
          <p>Join our platform and take your creator journey to the next level.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
