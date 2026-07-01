import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BadgeHelp,
  MessageCircleHeart,
  Send,
  Shield,
  Users,
} from "lucide-react";

const ROOM_OPTIONS = [
  "Overthinking tonight",
  "School or work stress",
  "Friendship and family feelings",
  "Small wins and gratitude",
];

const ANIMAL_NAMES = [
  "Quiet Fox",
  "Soft Sparrow",
  "Calm River",
  "Moonlight Fern",
  "Amber Cloud",
  "Gentle Willow",
  "Kind Pebble",
  "Silver Dawn",
];

const STARTER_MESSAGES = [
  {
    id: "seed-1",
    alias: "Quiet Fox",
    room: "Overthinking tonight",
    text: "I needed a place where I could say I am mentally tired without having to explain everything.",
    time: "Just now",
    own: false,
  },
  {
    id: "seed-2",
    alias: "Calm River",
    room: "Overthinking tonight",
    text: "You are not the only one. Today felt heavy for me too, so I am taking things one hour at a time.",
    time: "Just now",
    own: false,
  },
  {
    id: "seed-3",
    alias: "Silver Dawn",
    room: "Small wins and gratitude",
    text: "My small win today was getting out of bed and drinking water before checking my phone.",
    time: "Just now",
    own: false,
  },
];

const STORAGE_KEY = "mindwell-anonymous-chat";
const PROFILE_KEY = "mindwell-anonymous-profile";

function timestampLabel() {
  return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function randomAlias() {
  return ANIMAL_NAMES[Math.floor(Math.random() * ANIMAL_NAMES.length)];
}

function readMessages() {
  if (typeof window === "undefined") {
    return STARTER_MESSAGES;
  }

  const saved = window.localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(STARTER_MESSAGES));
    return STARTER_MESSAGES;
  }

  try {
    return JSON.parse(saved);
  } catch {
    return STARTER_MESSAGES;
  }
}

function readProfile() {
  if (typeof window === "undefined") {
    return { alias: randomAlias(), room: ROOM_OPTIONS[0] };
  }

  const saved = window.localStorage.getItem(PROFILE_KEY);

  if (!saved) {
    const created = { alias: randomAlias(), room: ROOM_OPTIONS[0] };
    window.localStorage.setItem(PROFILE_KEY, JSON.stringify(created));
    return created;
  }

  try {
    return JSON.parse(saved);
  } catch {
    return { alias: randomAlias(), room: ROOM_OPTIONS[0] };
  }
}

export default function AnonymousChat() {
  const profile = useMemo(() => readProfile(), []);
  const [alias, setAlias] = useState(profile.alias);
  const [activeRoom, setActiveRoom] = useState(profile.room);
  const [messages, setMessages] = useState(() => readMessages());
  const [draft, setDraft] = useState("");
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const handleStorage = (event) => {
      if (event.key === STORAGE_KEY && event.newValue) {
        setMessages(JSON.parse(event.newValue));
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(PROFILE_KEY, JSON.stringify({ alias, room: activeRoom }));
    }
  }, [alias, activeRoom]);

  const filteredMessages = messages.filter((message) => message.room === activeRoom);

  function updateMessages(nextMessages) {
    setMessages(nextMessages);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextMessages));
    }
  }

  function handleJoin() {
    setJoined(true);
  }

  function handleSend(event) {
    event.preventDefault();

    if (!draft.trim()) {
      return;
    }

    const nextMessages = [
      ...messages,
      {
        id: `${Date.now()}`,
        alias,
        room: activeRoom,
        text: draft.trim(),
        time: timestampLabel(),
        own: true,
      },
    ];

    updateMessages(nextMessages);
    setDraft("");
  }

  function refreshAlias() {
    setAlias(randomAlias());
  }

  return (
    <main className="chat-page">
      <section className="chat-shell">
        <div className="chat-sidebar">
          <Link to="/" className="chat-back">
            <ArrowLeft size={18} />
            Back to home
          </Link>

          <p className="eyebrow">Anonymous support room</p>
          <h1>Join a gentle group chat and share what something feels like.</h1>
          <p className="chat-lead">
            Everyone enters with a generated anonymous name. No profile photo, no public personal
            details, just honest feelings and supportive replies.
          </p>

          <div className="chat-safety-card">
            <div className="chat-safety-item">
              <Shield size={18} />
              <span>Your alias is generated automatically and can be changed anytime.</span>
            </div>
            <div className="chat-safety-item">
              <Users size={18} />
              <span>Pick a room based on what you want to talk about, not who you are.</span>
            </div>
            <div className="chat-safety-item">
              <BadgeHelp size={18} />
              <span>Kindness first. This is for peer support, not crisis or emergency care.</span>
            </div>
          </div>

          <div className="chat-join-card">
            <label className="auth-field">
              <span>Anonymous name</span>
              <div className="chat-alias-row">
                <input type="text" value={alias} onChange={(event) => setAlias(event.target.value)} />
                <button type="button" className="chat-ghost-button" onClick={refreshAlias}>
                  Refresh
                </button>
              </div>
            </label>

            <label className="auth-field">
              <span>Choose a room</span>
              <select value={activeRoom} onChange={(event) => setActiveRoom(event.target.value)}>
                {ROOM_OPTIONS.map((room) => (
                  <option key={room} value={room}>
                    {room}
                  </option>
                ))}
              </select>
            </label>

            <button type="button" className="auth-primary-button" onClick={handleJoin}>
              {joined ? "You are in the room" : "Join anonymously"}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="chat-room">
          <div className="chat-room-header">
            <div>
              <p className="auth-eyebrow">Live room</p>
              <h2>{activeRoom}</h2>
            </div>
            <span className="chat-pill">
              <MessageCircleHeart size={16} />
              {filteredMessages.length} messages
            </span>
          </div>

          <div className="chat-thread">
            {filteredMessages.map((message) => (
              <article
                key={message.id}
                className={message.alias === alias && message.own ? "chat-message is-own" : "chat-message"}
              >
                <div className="chat-message-top">
                  <strong>{message.alias}</strong>
                  <span>{message.time}</span>
                </div>
                <p>{message.text}</p>
              </article>
            ))}
          </div>

          <form className="chat-compose" onSubmit={handleSend}>
            <label className="chat-compose-label" htmlFor="anonymous-message">
              Share how you feel without using your real name
            </label>
            <div className="chat-compose-row">
              <textarea
                id="anonymous-message"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                rows={3}
                placeholder={
                  joined
                    ? "Say what feels heavy, confusing, relieving, or hopeful today..."
                    : "Join the room first, then your message will appear here."
                }
                disabled={!joined}
              />
              <button type="submit" className="auth-primary-button" disabled={!joined || !draft.trim()}>
                Send
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
