import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route, 
  Routes, 
  Navigate
} from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import LoginForm from "./LoginPage";
import ScrumbBoard from "./ScrumbBoard";

export function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAuthenticating(false);
    });
  }, []);

  async function handleLogout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  return (
    <Router>
      {isAuthenticating ? (
        <div>Loading...</div>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/scrumboard"
            element={
              user ? (
                <ScrumbBoard currentUser={user} handleLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}
