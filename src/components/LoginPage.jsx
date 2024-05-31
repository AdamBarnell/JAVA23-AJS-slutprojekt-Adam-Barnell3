import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import "../css/Login.css";

//This is the login screen that the user is by default coming to if not signed in
//Logins through database exisiting users and google account. Can be extending with other ways to sign in

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/scrumboard");
    } catch (error) {
      setError(error.message);
      console.error("Error logging in:", error);
    }
  }

  async function handleGoogleLogin() {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/scrumboard");
    } catch (error) {
      setError(error.message);
      console.error("Error logging in with Google:", error);
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
        <button onClick={handleGoogleLogin} className="google-login-button">
          <img
            src="https://www.pngall.com/wp-content/uploads/13/Google-Logo-PNG-Images.png"
            alt="Google logo"
            className="google-logo"
          />
          Log In with Google
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
