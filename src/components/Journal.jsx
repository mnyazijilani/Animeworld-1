import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookHeart, CalendarDays, HeartPulse, Save, Trash2 } from "lucide-react";

const JOURNAL_STORAGE_KEY = "mindwell-daily-journal";

const moodOptions = ["Heavy", "Anxious", "Calm", "Grateful", "Hopeful"];

const starterPrompt =
  "What did today feel like in your body, your mind, or your relationships?";

function formatToday() {
  return new Date().toISOString().slice(0, 10);
}

function formatEntryDate(value) {
  return new Date(value).toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function readEntries() {
  if (typeof window === "undefined") {
    return [];
  }

  const saved = window.localStorage.getItem(JOURNAL_STORAGE_KEY);

  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

export default function Journal() {
  const [entries, setEntries] = useState(() => readEntries());
  const [selectedMood, setSelectedMood] = useState("Heavy");
  const [entryDate, setEntryDate] = useState(formatToday());
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [savedState, setSavedState] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(entries));
    }
  }, [entries]);

  const orderedEntries = useMemo(
    () => [...entries].sort((left, right) => new Date(right.date) - new Date(left.date)),
    [entries],
  );

  function handleSave(event) {
    event.preventDefault();

    if (!body.trim()) {
      return;
    }

    const nextEntry = {
      id: `${Date.now()}`,
      mood: selectedMood,
      date: entryDate,
      title: title.trim() || "Untitled reflection",
      body: body.trim(),
    };

    setEntries((current) => [nextEntry, ...current]);
    setTitle("");
    setBody("");
    setSelectedMood("Heavy");
    setEntryDate(formatToday());
    setSavedState("Saved to your private journal");
  }

  function deleteEntry(id) {
    setEntries((current) => current.filter((entry) => entry.id !== id));
  }

  return (
    <main className="journal-page">
      <section className="journal-shell">
        <div className="journal-sidebar">
          <Link to="/" className="chat-back">
            <ArrowLeft size={18} />
            Back to home
          </Link>

          <p className="eyebrow">Private daily journal</p>
          <h1>A quiet place to type what you go through each day.</h1>
          <p className="chat-lead">
            This journal stays on the current device and gives you a gentle space to name what
            happened, how it felt, and what you want to remember about today.
          </p>

          <div className="journal-prompt-card">
            <div className="chat-safety-item">
              <BookHeart size={18} />
              <span>{starterPrompt}</span>
            </div>
            <div className="chat-safety-item">
              <HeartPulse size={18} />
              <span>Choose a mood, write freely, and come back to notice your patterns.</span>
            </div>
            <div className="chat-safety-item">
              <CalendarDays size={18} />
              <span>Your entries are ordered by day so your progress stays visible.</span>
            </div>
          </div>
        </div>

        <div className="journal-main">
          <form className="journal-form" onSubmit={handleSave}>
            <div className="journal-form-top">
              <div>
                <p className="auth-eyebrow">New entry</p>
                <h2>Write today down before it slips away.</h2>
              </div>
              {savedState ? <span className="journal-status">{savedState}</span> : null}
            </div>

            <div className="journal-grid">
              <label className="auth-field">
                <span>Date</span>
                <input type="date" value={entryDate} onChange={(event) => setEntryDate(event.target.value)} />
              </label>

              <label className="auth-field">
                <span>Mood</span>
                <select value={selectedMood} onChange={(event) => setSelectedMood(event.target.value)}>
                  {moodOptions.map((mood) => (
                    <option key={mood} value={mood}>
                      {mood}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="auth-field">
              <span>Title</span>
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Give today a short title"
              />
            </label>

            <label className="auth-field">
              <span>What did you go through today?</span>
              <textarea
                value={body}
                onChange={(event) => setBody(event.target.value)}
                rows={8}
                placeholder="Write about what happened, how it affected you, what felt heavy, what helped, or what you wish someone understood."
                required
              />
            </label>

            <button type="submit" className="auth-primary-button">
              Save journal entry
              <Save size={18} />
            </button>
          </form>

          <div className="journal-history">
            <div className="journal-history-top">
              <p className="auth-eyebrow">Your reflections</p>
              <h3>{orderedEntries.length ? "A timeline of your days" : "No entries yet"}</h3>
            </div>

            <div className="journal-list">
              {orderedEntries.length ? (
                orderedEntries.map((entry) => (
                  <article key={entry.id} className="journal-entry-card">
                    <div className="journal-entry-top">
                      <div>
                        <span className="journal-mood-pill">{entry.mood}</span>
                        <h4>{entry.title}</h4>
                      </div>
                      <button
                        type="button"
                        className="journal-delete-button"
                        onClick={() => deleteEntry(entry.id)}
                        aria-label={`Delete ${entry.title}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <p className="journal-entry-date">{formatEntryDate(entry.date)}</p>
                    <p className="journal-entry-body">{entry.body}</p>
                  </article>
                ))
              ) : (
                <div className="journal-empty">
                  <p>Your first entry can be messy, honest, short, or long. It just has to be yours.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
