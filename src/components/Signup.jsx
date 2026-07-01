import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  HeartHandshake,
  Lock,
  Mail,
  UserRound,
} from "lucide-react";
import { createUserAccount } from "../utils/auth";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password.trim(),
    };

    try {
      const user = createUserAccount(payload);

      setSuccess(
        `Welcome aboard, ${user.name || "friend"}! Your account is ready.`,
      );
      setForm({
        name: "",
        email: "",
        password: "",
      });
    } catch (requestError) {
      setError(
        requestError?.message || "We couldn't create your account right now.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-layout auth-layout-reverse">
        <div className="auth-aside">
          <span className="auth-badge">
            <HeartHandshake size={16} />
            Start gently
          </span>
          <h1>Create an account that supports your pace.</h1>
          <p>
            Join MindWell to save your favorite routines, revisit calming
            exercises, and build a steadier mental-health rhythm one day at a
            time.
          </p>

          <div className="auth-aside-card">
            <div className="auth-aside-item">
              <strong>Personal routines</strong>
              <span>
                Keep the practices that help you feel centered close at hand.
              </span>
            </div>
            <div className="auth-aside-item">
              <strong>Reflect without pressure</strong>
              <span>
                Capture moods, wins, and small shifts in a kinder way.
              </span>
            </div>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-card-top">
            <span className="auth-mark">
              <HeartHandshake size={18} />
            </span>
            <p className="auth-eyebrow">Sign up</p>
            <h2>Begin your MindWell journey.</h2>
            <p className="auth-intro">
              A few details and you’re ready to start.
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-field">
              <span>Full name</span>
              <div className="auth-input-with-icon">
                <UserRound size={18} />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />
              </div>
            </label>

            <label className="auth-field">
              <span>Email address</span>
              <div className="auth-input-with-icon">
                <Mail size={18} />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="hello@mindwell.app"
                  required
                />
              </div>
            </label>

            <label className="auth-field">
              <span>Create password</span>
              <div className="auth-input-with-icon">
                <Lock size={18} />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Choose a secure password"
                  required
                />
              </div>
            </label>

            <label className="auth-check auth-check-wide">
              <input type="checkbox" required />
              <span>
                I agree to use MindWell as a supportive tool, not emergency
                medical care.
              </span>
            </label>

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
              {loading ? "Creating account..." : "Create account"}
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="auth-footer">
            <p>Already have an account?</p>
            <Link to="/signin" className="auth-secondary-button">
              Sign in instead
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
