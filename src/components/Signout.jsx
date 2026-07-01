import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, DoorOpen } from "lucide-react";

export default function Signout() {
  return (
    <main className="auth-page">
      <section className="signout-card">
        <span className="auth-mark">
          <CheckCircle2 size={18} />
        </span>
        <p className="auth-eyebrow">Signed out</p>
        <h1>You’ve been signed out gently and safely.</h1>
        <p className="auth-intro">
          Your session has ended. You can return home, or sign back in whenever you’re ready.
        </p>

        <div className="signout-actions">
          <Link to="/" className="auth-secondary-button">
            Return home
          </Link>
          <Link to="/signin" className="auth-primary-button">
            Sign in again
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="signout-note">
          <DoorOpen size={18} />
          <span>MindWell keeps the tone calm even at the edges of the flow.</span>
        </div>
      </section>
    </main>
  );
}
