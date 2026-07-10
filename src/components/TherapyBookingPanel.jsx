import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Calendar, HeartHandshake } from "lucide-react";

const APPOINTMENT_STORAGE_KEY = "mindwell-home-therapy-appointment";

const therapySessionTypes = [
  "Individual therapy",
  "Check-in session",
  "Group therapy",
];

const therapistWeeklyAvailability = {
  1: ["09:00", "11:30", "15:00"],
  2: ["10:00", "13:00"],
  3: ["09:30", "12:30", "16:00"],
  4: ["11:00", "14:00"],
  5: ["09:00", "10:30", "13:30"],
};

function getDefaultBookingForm() {
  return {
    fullName: "",
    sessionType: therapySessionTypes[0],
    date: "",
    selectedSlot: "",
    notes: "",
  };
}

function readSavedAppointment() {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(APPOINTMENT_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function formatDateLabel(value) {
  if (!value) {
    return "";
  }

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);
}

function formatDateValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getMonthStart(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function getMonthLabel(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function shiftMonth(date, change) {
  return new Date(date.getFullYear(), date.getMonth() + change, 1);
}

function buildCalendarDays(monthDate) {
  const start = getMonthStart(monthDate);
  const firstWeekday = start.getDay();
  const daysInMonth = new Date(
    start.getFullYear(),
    start.getMonth() + 1,
    0,
  ).getDate();
  const cells = [];

  for (let index = 0; index < firstWeekday; index += 1) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(start.getFullYear(), start.getMonth(), day);
    cells.push({
      value: formatDateValue(date),
      label: day,
      spokenLabel: new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(date),
    });
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return cells;
}

function formatTimeLabel(value) {
  const [hours, minutes] = value.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function getTherapistAvailability(dateValue) {
  if (!dateValue) {
    return {
      isAvailable: false,
      tone: "idle",
      title: "Select a day from the calendar",
      detail:
        "Choose a date to see whether the therapist is free and which time slots are open.",
      slots: [],
    };
  }

  const [year, month, day] = dateValue.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const dayOfWeek = date.getDay();

  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return {
      isAvailable: false,
      tone: "closed",
      title: "Therapist unavailable",
      detail: `${formatDateLabel(dateValue)} is outside therapy hours. Please choose a weekday for live sessions.`,
      slots: [],
    };
  }

  const slots = therapistWeeklyAvailability[dayOfWeek] || [];

  if (!slots.length) {
    return {
      isAvailable: false,
      tone: "busy",
      title: "Fully booked",
      detail: `The therapist is not free on ${formatDateLabel(dateValue)}. Try the next available weekday.`,
      slots: [],
    };
  }

  return {
    isAvailable: true,
    tone: "open",
    title: "Therapist is free",
    detail: `${formatDateLabel(dateValue)} has ${slots.length} open ${slots.length === 1 ? "session" : "sessions"} right now.`,
    slots,
  };
}

export default function TherapyBookingPanel() {
  const today = useMemo(() => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    return date;
  }, []);
  const [bookingForm, setBookingForm] = useState(() => getDefaultBookingForm());
  const [savedAppointment, setSavedAppointment] = useState(() =>
    readSavedAppointment(),
  );
  const [bookingMessage, setBookingMessage] = useState("");
  const [calendarMonth, setCalendarMonth] = useState(() => getMonthStart());

  const availability = useMemo(
    () => getTherapistAvailability(bookingForm.date),
    [bookingForm.date],
  );
  const calendarDays = useMemo(
    () => buildCalendarDays(calendarMonth),
    [calendarMonth],
  );
  const todayValue = useMemo(() => formatDateValue(today), [today]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (savedAppointment) {
      window.localStorage.setItem(
        APPOINTMENT_STORAGE_KEY,
        JSON.stringify(savedAppointment),
      );
      return;
    }

    window.localStorage.removeItem(APPOINTMENT_STORAGE_KEY);
  }, [savedAppointment]);

  function handleFormChange(event) {
    const { name, value } = event.target;

    setBookingForm((current) => ({
      ...current,
      [name]: value,
    }));
    setBookingMessage("");
  }

  function handleSlotSelect(slot) {
    setBookingForm((current) => ({
      ...current,
      selectedSlot: slot,
    }));
    setBookingMessage("");
  }

  function handleCalendarSelect(dateValue) {
    setBookingForm((current) => ({
      ...current,
      date: dateValue,
      selectedSlot: "",
    }));
    setBookingMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!bookingForm.fullName || !bookingForm.date || !bookingForm.selectedSlot) {
      setBookingMessage(
        "Add your name, choose a date, and pick an open time to book the session.",
      );
      return;
    }

    if (!availability.isAvailable) {
      setBookingMessage(
        "That day is not available for therapy right now. Please choose another date.",
      );
      return;
    }

    const confirmedAppointment = {
      fullName: bookingForm.fullName,
      sessionType: bookingForm.sessionType,
      date: bookingForm.date,
      selectedSlot: bookingForm.selectedSlot,
      notes: bookingForm.notes,
    };

    setSavedAppointment(confirmedAppointment);
    setBookingMessage(
      `Therapy session booked for ${bookingForm.fullName} on ${formatDateLabel(bookingForm.date)} at ${formatTimeLabel(bookingForm.selectedSlot)}.`,
    );
  }

  return (
    <div className="appointment-shell">
      <form className="appointment-card" onSubmit={handleSubmit}>
        <div className="panel-heading">
          <span className="panel-icon">
            <HeartHandshake size={18} />
          </span>
          <div>
            <p className="eyebrow">Book now</p>
            <h3>Choose a date and check availability</h3>
          </div>
        </div>

        <div className="appointment-form-grid">
          <label className="appointment-field">
            <span>Your name</span>
            <input
              type="text"
              name="fullName"
              value={bookingForm.fullName}
              onChange={handleFormChange}
              placeholder="Enter your name"
            />
          </label>

          <label className="appointment-field">
            <span>Session type</span>
            <select
              name="sessionType"
              value={bookingForm.sessionType}
              onChange={handleFormChange}
            >
              {therapySessionTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="appointment-calendar-card">
          <div className="appointment-calendar-top">
            <div>
              <span className="appointment-calendar-label">Select a day</span>
              <p className="appointment-calendar-selected">
                {bookingForm.date
                  ? formatDateLabel(bookingForm.date)
                  : "Choose a date from the calendar below"}
              </p>
            </div>

            <div className="appointment-calendar-nav">
              <button
                type="button"
                className="appointment-calendar-button"
                onClick={() => setCalendarMonth((current) => shiftMonth(current, -1))}
                aria-label="Previous month"
              >
                Prev
              </button>
              <strong>{getMonthLabel(calendarMonth)}</strong>
              <button
                type="button"
                className="appointment-calendar-button"
                onClick={() => setCalendarMonth((current) => shiftMonth(current, 1))}
                aria-label="Next month"
              >
                Next
              </button>
            </div>
          </div>

          <div className="appointment-calendar-weekdays" aria-hidden="true">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div
            className="appointment-calendar-grid"
            role="grid"
            aria-label="Appointment calendar"
            aria-describedby="appointment-availability"
          >
            {calendarDays.map((day, index) =>
              day ? (
                <button
                  key={day.value}
                  type="button"
                  className={
                    bookingForm.date === day.value
                      ? "appointment-day is-active"
                      : "appointment-day"
                  }
                  onClick={() => handleCalendarSelect(day.value)}
                  aria-label={`Select ${day.spokenLabel}`}
                  aria-pressed={bookingForm.date === day.value}
                  data-is-today={day.value === todayValue ? "true" : "false"}
                >
                  {day.label}
                </button>
              ) : (
                <span
                  key={`empty-${index}`}
                  className="appointment-day is-empty"
                  aria-hidden="true"
                />
              ),
            )}
          </div>
        </div>

        <div
          id="appointment-availability"
          className={`appointment-availability is-${availability.tone}`}
          aria-live="polite"
        >
          <strong>{availability.title}</strong>
          <p>{availability.detail}</p>
        </div>

        {availability.isAvailable ? (
          <div className="appointment-slot-section">
            <p className="appointment-slot-title">Open time slots</p>
            <div className="appointment-slot-list">
              {availability.slots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  className={
                    bookingForm.selectedSlot === slot
                      ? "appointment-slot is-active"
                      : "appointment-slot"
                  }
                  onClick={() => handleSlotSelect(slot)}
                >
                  {formatTimeLabel(slot)}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <label className="appointment-field appointment-field-wide">
          <span>What would you like support with?</span>
          <textarea
            name="notes"
            value={bookingForm.notes}
            onChange={handleFormChange}
            placeholder="Share a short note for the therapist"
            rows={4}
          />
        </label>

        <div className="appointment-actions">
          <button
            type="submit"
            className="primary-action appointment-submit"
            disabled={!availability.isAvailable}
          >
            Confirm appointment
            <ArrowRight size={18} />
          </button>
          {bookingMessage ? (
            <p className="appointment-feedback">{bookingMessage}</p>
          ) : null}
        </div>
      </form>

      <aside className="appointment-summary-card">
        <span className="community-preview-tag">Availability guide</span>
        <h3>When the therapist is usually free</h3>
        <p>
          Weekday sessions are open Monday to Friday. Saturdays and Sundays are
          marked unavailable so visitors can immediately pick another day.
        </p>

        <div className="appointment-week-grid">
          {Object.entries({
            Monday: "9:00 AM, 11:30 AM, 3:00 PM",
            Tuesday: "10:00 AM, 1:00 PM",
            Wednesday: "9:30 AM, 12:30 PM, 4:00 PM",
            Thursday: "11:00 AM, 2:00 PM",
            Friday: "9:00 AM, 10:30 AM, 1:30 PM",
          }).map(([day, slots]) => (
            <div key={day} className="appointment-week-row">
              <strong>{day}</strong>
              <span>{slots}</span>
            </div>
          ))}
        </div>

        {savedAppointment ? (
          <div className="appointment-confirmed">
            <p className="eyebrow">Saved appointment</p>
            <h4>{savedAppointment.sessionType}</h4>
            <p>
              {savedAppointment.fullName} is booked for{" "}
              {formatDateLabel(savedAppointment.date)} at{" "}
              {formatTimeLabel(savedAppointment.selectedSlot)}.
            </p>
          </div>
        ) : (
          <div className="appointment-confirmed is-empty">
            <p className="eyebrow">No booking yet</p>
            <p>
              Your confirmed appointment will appear here once you choose an
              open day and time.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
