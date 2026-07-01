import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, Heart, ShieldCheck } from "lucide-react";
import { authenticateUser } from "../utils/auth";

export default function Signin({ onSignin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    const credentials = {
      email: email.trim(),
      password: password.trim(),
    };

    try {
      const session = authenticateUser(credentials);
      onSignin?.(session.session);

      setSuccess(`Welcome back, ${session.user.name || "friend"}!`);
      setEmail("");
      setPassword("");
      window.setTimeout(() => navigate("/"), 1200);
    } catch (requestError) {
      setError(requestError?.message || "We couldn't sign you in right now.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-layout">
        <div className="auth-aside">
          <span className="auth-badge">
            <Heart size={16} />
            MindWell access
          </span>
          <h1>Welcome back to your calm corner.</h1>
          <p>
            Sign in to continue with check-ins, supportive routines, and
            mental-health tools built to feel gentle instead of overwhelming.
          </p>

          <div className="auth-aside-card">
            <div className="auth-aside-item">
              <strong>Daily check-ins</strong>
              <span>
                Track your mood and notice patterns with less pressure.
              </span>
            </div>
            <div className="auth-aside-item">
              <strong>Private support tools</strong>
              <span>
                Return to saved routines, grounding prompts, and care reminders.
              </span>
            </div>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-card-top">
            <span className="auth-mark">
              <ShieldCheck size={18} />
            </span>
            <p className="auth-eyebrow">Sign in</p>
            <h2>Your wellbeing space is waiting.</h2>
            <p className="auth-intro">
              Use your email and password to continue.
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-field">
              <span>Email address</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="hello@mindwell.app"
                required
              />
            </label>

            <label className="auth-field">
              <span>Password</span>
              <div className="auth-password-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="auth-icon-button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            <div className="auth-form-row">
              <label className="auth-check">
                <input type="checkbox" />
                <span>Keep me signed in</span>
              </label>
              <button type="button" className="auth-link-button">
                Forgot password?
              </button>
            </div>

            {success ? (
              <p className="auth-success-message" role="status">
                {success}
              </p>
            ) : null}

            {error ? (
              <p className="auth-error-message" role="alert">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              className="auth-primary-button"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="auth-footer">
            <p>New here?</p>
            <Link to="/signup" className="auth-secondary-button">
              Create an account
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
