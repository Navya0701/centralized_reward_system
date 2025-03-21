import React from "react";
import { useNavigate } from "react-router-dom";
import "./Explore.css";

function Explore() {
  const navigate = useNavigate();

  return (
    <div className="explore-container">
      <header className="explore-header">
        <h1>Discover & Connect with Creators</h1>
        <p>Find creative minds, collaborate, and grow your network.</p>
      </header>

      <section className="explore-grid">
        <div className="explore-card">
          <h3>Showcase Your Work</h3>
          <p>Upload your projects, share your skills, and attract opportunities.</p>
        </div>
        <div className="explore-card">
          <h3>Collaborate with Others</h3>
          <p>Join forces with fellow creators to build something amazing.</p>
        </div>
        <div className="explore-card">
          <h3>Monetize Your Talent</h3>
          <p>Earn through sponsorships, sales, and exclusive content.</p>
        </div>
      </section>

      <button className="explore-button" onClick={() => navigate("/")}>
        Go Back to Home
      </button>
    </div>
  );
}

export default Explore;
