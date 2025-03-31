import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react"; // ✅ Import Auth0
import "./signup.css";

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { loginWithRedirect } = useAuth0(); // ✅ Get Auth0 functions

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        
        {/* ✅ Email & Password Signup (Non-Auth0) */}
        <form>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email" required />
          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              required
            />
            <span
              className="toggle-password"
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer" }}
            >
              {passwordVisible ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>
          <button type="submit" className="btn-primary">Sign Up</button>
        </form>

        <div className="toggle">
          Already have an account? <a href="/login" className="login-link">Login</a>
        </div>

        <div className="divider">
          <span className="divider-text">OR</span>
        </div>

        {/* ✅ Social Signup Buttons (Google, Microsoft, Apple) */}
        <div className="social-buttons">
          {/* ✅ Google Signup */}
          <button
            className="social-btn"
            onClick={() => loginWithRedirect({ 
              connection: "google-oauth2",
              screen_hint: "signup",
              appState: { returnTo: "/home" }
            })}
          >
            <img src="google.png" alt="Google" /> Sign up with Google
          </button>

          {/* ✅ Microsoft Signup */}
          <button
            className="social-btn"
            onClick={() => loginWithRedirect({ 
              connection: "windowslive",
              screen_hint: "signup",
              appState: { returnTo: "/home" }
            })}
          >
            <img src="mic.png" alt="Microsoft" /> Sign up with Microsoft
          </button>

          {/* ✅ Apple Signup */}
          <button
            className="social-btn"
            onClick={() => loginWithRedirect({ 
              connection: "apple",
              screen_hint: "signup",
              appState: { returnTo: "/home" }
            })}
          >
            <img src="apple.png" alt="Apple" /> Sign up with Apple
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
