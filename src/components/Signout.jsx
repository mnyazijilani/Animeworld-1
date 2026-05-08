import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Signout = () => {
  const navigate = useNavigate();
  const hasSignedInUser = Boolean(localStorage.getItem("signedInUser"));

  const handleSignOut = () => {
    localStorage.removeItem("signedInUser");
    navigate("/signin");
  };

  return (
    <div className="row mt-4 justify-content-center">
      <div className="col-md-6">
        <div className="glass-form-card shadow-lg text-center p-4 p-md-5">
          <span className="glass-form-eyebrow">Session</span>
          <h1 className="glass-form-title text-dark">Sign Out</h1>
          <p className="glass-form-subtitle">
            {hasSignedInUser
              ? "You're currently signed in. Use the button below to sign out of AnimeWorld."
              : "You're already signed out. You can go back home or sign in again."}
          </p>
          {hasSignedInUser ? (
            <button
              type="button"
              className="btn btn-dark col-md-12 glass-submit-btn"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          ) : (
            <div className="d-grid gap-3">
              <Link to="/" className="btn btn-dark glass-submit-btn">
                Back Home
              </Link>
              <Link
                to="/signin"
                className="btn navbar-auth-btn navbar-auth-btn-primary text-dark"
              >
                Sign In Again
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signout;
