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
        <div className="logo">Rewardify</div>
        <ul className="nav-links">
         
          <li><a href="/explore">Balance</a></li>
          
          
          
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
          <h1>Welcome to Rewardify</h1>
          <p>Join our platform and track your rewards and unlock amazing benefits , make every purchase count towards something special!! .</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
