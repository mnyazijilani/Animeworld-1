import { Link } from "react-router-dom";
import { ArrowLeft, CalendarDays } from "lucide-react";
import TherapyBookingPanel from "./TherapyBookingPanel";

export default function TherapyAppointmentsPage() {
  return (
    <main className="appointments-page">
      <section className="appointments-shell">
        <div className="appointments-page-top">
          <Link to="/" className="chat-back">
            <ArrowLeft size={18} />
            Back to home
          </Link>

          <p className="eyebrow">
            <CalendarDays size={16} />
            Therapy appointments
          </p>
          <h1>Book therapy support from its own page.</h1>
          <p className="appointments-page-lead">
            Choose the day you want from the calendar, confirm the therapist is
            free, then select an open session time that works for you.
          </p>
        </div>

        <TherapyBookingPanel />
      </section>
    </main>
  );
}
