import React from "react";
import "./Home.css";

function Home() {
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

        {/* Login and Signup Buttons at the Top Right */}
        <div className="auth-buttons">
          <a href="/login" className="login-btn">Login </a>
          <a href="/signup" className="signup-btn">Sign Up</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <h1>Empower Your Creativity & Connect with Your Audience</h1>
        <p>Showcase, monetize, and grow your creative work through collaboration.</p>
        <div className="cta">
          <input type="email" placeholder="Enter your email..." />
          <button className="signup-btn">Join Now</button>
        </div>
      </header>
    </div>
  );
}

export default Home;
