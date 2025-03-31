import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react"; // ✅ Import Auth0
import "./login.css";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { loginWithRedirect } = useAuth0(); // ✅ Get Auth0 functions

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        
        {/* ✅ Email & Password Login (Non-Auth0) */}
        <form>
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
          <button type="submit" className="btn-primary">Login</button>
        </form>

        <div className="toggle">
          Don't have an account? <a href="/signup" className="signup-link">Sign Up</a>
        </div>

        <div className="divider">
          <span className="divider-text">OR</span>
        </div>

        {/* ✅ Social Login Buttons (Google, Microsoft, Apple) */}
        <div className="social-buttons">
          {/* ✅ Google Login */}
          <button
            className="social-btn"
            onClick={() => loginWithRedirect({ 
              connection: "google-oauth2",
              appState: { returnTo: "/home" }
            })}
          >
            <img src="google.png" alt="Google" /> continue with Google
          </button>

          {/* ✅ Microsoft Login */}
          <button
            className="social-btn"
            onClick={() => loginWithRedirect({ 
              connection: "windowslive",
              appState: { returnTo: "/home" }
            })}
          >
            <img src="mic.png" alt="Microsoft" />continue with Microsoft
          </button>

          {/* ✅ Apple Login */}
          <button
            className="social-btn"
            onClick={() => loginWithRedirect({ 
              connection: "apple",
              appState: { returnTo: "/home" }
            })}
          >
            <img src="apple.png" alt="Apple" />continue with Apple
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
