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
          <p>Upload your projects, share your skills, and attract opportunities.</p>
          <button onClick={() => navigate("/upload")} className="btn showcase-btn">
            Showcase Your Work
          </button>
        </div>
        <div className="explore-card">
          <p>Join forces with fellow creators, work together, and bring ideas to life.</p>
          <button onClick={() => navigate("/collaborate")} className="btn collaborate-btn">
            Collaborate with Others
          </button>
        </div>
        <div className="explore-card">
          <p>Turn your creativity into income through sponsorships</p>
          <button onClick={() => navigate("/monetize")} className="btn monetize-btn">
            Monetize Your Talent
          </button>
        </div>
      </section>

      <button className="explore-button" onClick={() => navigate("/")}>Go Back to Home</button>
    </div>
  );
}

export default Explore;