import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  BookHeart,
  DoorOpen,
  Droplets,
  Dumbbell,
  HeartPulse,
  MessageCircleQuestion,
  Send,
  Sparkles,
  X,
} from "lucide-react";

const JOURNAL_STORAGE_KEY = "mindwell-daily-journal";
const WELLNESS_STORAGE_KEY = "mindwell-chatbot-wellness";

const quickQuestions = [
  "I feel stressed about school",
  "Give me a wellness tip",
  "How much water should I track today?",
  "Where can a student get help?",
  "Give me a journaling prompt",
];

const journalPrompts = [
  "What felt heavier than it looked on the outside today?",
  "What gave me even a small amount of relief today?",
  "What do I wish a kind friend would say to me right now?",
  "What pattern have I noticed in my energy this week?",
  "What would taking care of myself tonight look like in one small step?",
];

const moodChoices = [
  { emoji: "😊", label: "Good" },
  { emoji: "😌", label: "Calm" },
  { emoji: "😔", label: "Low" },
  { emoji: "😣", label: "Stressed" },
];

function normalizeMessage(message) {
  return message
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function includesAny(text, phrases) {
  return phrases.some((phrase) => text.includes(phrase));
}

function readWellnessState() {
  if (typeof window === "undefined") {
    return {
      mood: "Calm",
      waterGlasses: 0,
      fitnessMinutes: 0,
      promptIndex: 0,
    };
  }

  const raw = window.localStorage.getItem(WELLNESS_STORAGE_KEY);

  if (!raw) {
    return {
      mood: "Calm",
      waterGlasses: 0,
      fitnessMinutes: 0,
      promptIndex: 0,
    };
  }

  try {
    const parsed = JSON.parse(raw);
    return {
      mood: parsed.mood || "Calm",
      waterGlasses: Number(parsed.waterGlasses) || 0,
      fitnessMinutes: Number(parsed.fitnessMinutes) || 0,
      promptIndex: Number(parsed.promptIndex) || 0,
    };
  } catch {
    return {
      mood: "Calm",
      waterGlasses: 0,
      fitnessMinutes: 0,
      promptIndex: 0,
    };
  }
}

function readJournalEntries() {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(JOURNAL_STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function buildReply(message, context) {
  const text = normalizeMessage(message);

  if (
    includesAny(text, [
      "hello",
      "hi",
      "hey",
      "good morning",
      "good afternoon",
      "good evening",
    ])
  ) {
    return {
      text: "Hi, I’m here to help with wellness questions, student support, journaling prompts, mood check-ins, water tracking, and simple daily habits.",
      link: null,
    };
  }

  if (
    includesAny(text, [
      "emergency",
      "suicide",
      "self-harm",
      "harm myself",
      "crisis",
    ])
  ) {
    return {
      text: "If someone may be in immediate danger or might harm themselves, urgent human help should come first. Contact emergency services, a crisis line, or a trusted adult, counselor, guardian, or clinician right away.",
      link: { to: "/support", label: "Open urgent support contacts" },
    };
  }

  if (
    includesAny(text, ["therapy", "therapist", "appointment", "book"])
  ) {
    return {
      text: "Use the Appointments button to open the dedicated booking page, choose a day from the calendar, and check whether the therapist is free before selecting a slot.",
      link: { to: "/appointments", label: "Open appointments page" },
    };
  }

  if (
    includesAny(text, [
      "resource",
      "help",
      "support",
      "counselor",
      "counsellor",
      "doctor",
      "clinic",
    ])
  ) {
    return {
      text: "MindWell can guide you toward support resources, but it does not replace medical or mental-health professionals. A good next step is a trusted adult, school counselor, campus clinic, therapist, or the emergency contacts on the Support page.",
      link: { to: "/support", label: "Go to Support" },
    };
  }

  if (
    includesAny(text, ["stress", "anxious", "anxiety", "overwhelmed"])
  ) {
    return {
      text: "When stress spikes, try shrinking the next hour: unclench your jaw, take 6 slow breaths, drink some water, and choose just one next task instead of the whole day.",
      link: { to: "/rituals", label: "Open calming rituals" },
    };
  }

  if (
    includesAny(text, ["sad", "lonely", "down", "depressed"])
  ) {
    return {
      text: "Low days deserve gentleness, not pressure. Try naming the feeling, reaching out to one safe person, getting daylight or fresh air if possible, and using the journal to unload what feels stuck.",
      link: { to: "/journal", label: "Open the journal" },
    };
  }

  if (
    includesAny(text, ["sleep", "tired", "insomnia", "rest"])
  ) {
    return {
      text: "A simple sleep reset can help: dim screens earlier, lower stimulation for 20 to 30 minutes before bed, avoid forcing sleep, and choose one calming routine like breathing or light stretching.",
      link: { to: "/rituals", label: "See evening rituals" },
    };
  }

  if (
    includesAny(text, ["water", "hydration", "drink"])
  ) {
    return {
      text: `You have logged ${context.waterGlasses} glass${context.waterGlasses === 1 ? "" : "es"} today. A gentle target is 6 to 8 glasses across the day, spaced out instead of rushed all at once.`,
      link: null,
    };
  }

  if (
    includesAny(text, ["fitness", "exercise", "workout", "walk", "run"])
  ) {
    return {
      text: `You have tracked ${context.fitnessMinutes} fitness minute${context.fitnessMinutes === 1 ? "" : "s"} so far. Consistency matters more than intensity, so even a 10-minute walk, stretch, or dance break counts.`,
      link: null,
    };
  }

  if (
    includesAny(text, ["study", "school", "exam", "student"])
  ) {
    return {
      text: "For students, a steadier plan usually works better than pushing until burnout: study in one short block, drink water, pause your phone, and check in with a counselor, school nurse, lecturer, or trusted adult if the pressure keeps building.",
      link: { to: "/support", label: "Find support resources" },
    };
  }

  if (
    includesAny(text, ["habit", "routine", "wellness", "tip", "healthy"])
  ) {
    return {
      text: "One strong wellness habit is to build tiny anchors: drink water after waking up, step away from the screen once each study block, move your body for 10 minutes, and write one honest sentence about your mood before sleep.",
      link: { to: "/rituals", label: "See habit ideas" },
    };
  }

  if (includesAny(text, ["mood", "feeling", "feelings"])) {
    return {
      text: `Your current mood check-in is marked as ${context.mood}. You can update it below anytime. Tracking mood gently over several days can reveal patterns without turning it into pressure.`,
      link: { to: "/journal", label: "Reflect in journal" },
    };
  }

  if (
    includesAny(text, ["journal", "write", "prompt"])
  ) {
    return {
      text: `Try this prompt: "${journalPrompts[context.promptIndex]}". You already have ${context.journalCount} journal entr${context.journalCount === 1 ? "y" : "ies"} saved on this device.`,
      link: { to: "/journal", label: "Open Journal" },
    };
  }

  if (
    includesAny(text, ["chat", "anonymous", "community"])
  ) {
    return {
      text: "The Community page gives students an anonymous place to talk through stress, friendships, pressure, or small wins without needing to share personal details.",
      link: { to: "/community", label: "Open Community" },
    };
  }

  if (includesAny(text, ["faq", "question"])) {
    return {
      text: "The FAQ page is a quick place to understand privacy, journaling, rituals, and how to use the support tools.",
      link: { to: "/faq", label: "Open FAQ" },
    };
  }

  if (
    includesAny(text, ["sign in", "login", "log in", "account"])
  ) {
    return {
      text: "You can sign in from the top navigation, but the support pages, rituals, and guidance are still explorable even before signing in.",
      link: { to: "/signin", label: "Go to Sign in" },
    };
  }

  if (includesAny(text, ["thanks", "thank you"])) {
    return {
      text: "You’re welcome. If you want, ask about stress, support, journaling, hydration, movement, sleep, or student wellbeing.",
      link: null,
    };
  }

  return {
    text: "I can answer common wellness questions, suggest healthy habits, guide students to support resources, and help you track mood, water, fitness, and journaling prompts.",
    link: null,
  };
}

function TrackerCard({ icon: Icon, title, children }) {
  return (
    <section className="helpbot-card">
      <div className="helpbot-card-top">
        <span className="helpbot-card-icon">
          <Icon size={16} />
        </span>
        <strong>{title}</strong>
      </div>
      {children}
    </section>
  );
}

function HelpChatbotPanel({
  canClose,
  currentPrompt,
  draft,
  fitnessGoalReached,
  handleSubmit,
  isCompact,
  isPage,
  journalCount,
  messages,
  pageHint,
  pushMessage,
  rotatePrompt,
  setDraft,
  setIsOpen,
  updateFitness,
  updateMood,
  updateWater,
  waterGoalReached,
  wellness,
  session,
}) {
  return (
    <section
      className={
        isPage
          ? "helpbot-panel helpbot-panel-page"
          : isCompact
            ? "helpbot-panel helpbot-panel-compact"
            : "helpbot-panel helpbot-panel-wide"
      }
      aria-label="Website help chatbot"
    >
      <div className="helpbot-header">
        <div>
          <p className="helpbot-label">Wellness chatbot</p>
          <h2>MindWell Guide</h2>
        </div>
        {canClose || session ? (
          <div className="helpbot-close-row">
            {session ? (
              <Link to="/signout" className="helpbot-text-close helpbot-exit-link">
                <DoorOpen size={16} />
                Exit account
              </Link>
            ) : null}
            <button
              type="button"
              className="helpbot-text-close"
              onClick={() => setIsOpen(false)}
            >
              Close chat
            </button>
            <button
              type="button"
              className="helpbot-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
            >
              <X size={18} />
            </button>
          </div>
        ) : null}
      </div>

      <p className="helpbot-hint">{pageHint}</p>

      <div className="helpbot-dashboard">
        <TrackerCard icon={HeartPulse} title="Mood tracker">
          <div className="helpbot-mood-list">
            {moodChoices.map((item) => (
              <button
                key={item.label}
                type="button"
                className={
                  wellness.mood === item.label
                    ? "helpbot-mood-chip is-active"
                    : "helpbot-mood-chip"
                }
                onClick={() => updateMood(item.label)}
              >
                <span>{item.emoji}</span>
                {item.label}
              </button>
            ))}
          </div>
        </TrackerCard>

        <TrackerCard icon={Droplets} title="Water intake">
          <p className="helpbot-stat">
            <strong>{wellness.waterGlasses}</strong> / 8 glasses
          </p>
          <div className="helpbot-action-row">
            <button
              type="button"
              className="helpbot-mini-button"
              onClick={() => updateWater(1)}
            >
              +1 glass
            </button>
            <button
              type="button"
              className="helpbot-mini-button is-muted"
              onClick={() => updateWater(-1)}
            >
              Remove
            </button>
          </div>
          <p className="helpbot-mini-note">
            {waterGoalReached
              ? "Nice work staying hydrated today."
              : "Small sips through the day count."}
          </p>
        </TrackerCard>

        <TrackerCard icon={Dumbbell} title="Fitness tracker">
          <p className="helpbot-stat">
            <strong>{wellness.fitnessMinutes}</strong> / 30 minutes
          </p>
          <div className="helpbot-action-row">
            <button
              type="button"
              className="helpbot-mini-button"
              onClick={() => updateFitness(10)}
            >
              +10 min
            </button>
            <button
              type="button"
              className="helpbot-mini-button is-muted"
              onClick={() => updateFitness(-10)}
            >
              -10 min
            </button>
          </div>
          <p className="helpbot-mini-note">
            {fitnessGoalReached
              ? "You reached today's movement goal."
              : "Walking, stretching, or dancing all count."}
          </p>
        </TrackerCard>

        <TrackerCard icon={BookHeart} title="Journal support">
          <p className="helpbot-mini-note">{currentPrompt}</p>
          <div className="helpbot-action-row">
            <button
              type="button"
              className="helpbot-mini-button"
              onClick={rotatePrompt}
            >
              New prompt
            </button>
            <Link to="/journal" className="helpbot-inline-link">
              Open journal
            </Link>
          </div>
          <p className="helpbot-mini-note">
            {journalCount} saved journal entr
            {journalCount === 1 ? "y" : "ies"} on this device.
          </p>
        </TrackerCard>
      </div>

      <div className="helpbot-thread">
        {messages.map((message) => (
          <article
            key={message.id}
            className={
              message.from === "bot"
                ? "helpbot-message is-bot"
                : "helpbot-message is-user"
            }
          >
            <p>{message.text}</p>
            {message.link ? (
              <Link to={message.link.to} className="helpbot-link">
                {message.link.label}
              </Link>
            ) : null}
          </article>
        ))}
      </div>

      <div className="helpbot-quick-list">
        {quickQuestions.map((question) => (
          <button
            key={question}
            type="button"
            className="helpbot-quick"
            onClick={() => pushMessage(question)}
          >
            {question}
          </button>
        ))}
      </div>

      <div className="helpbot-safety">
        <Sparkles size={16} />
        <span>
          This chatbot shares general wellness guidance and resource
          directions, not diagnosis or emergency care.
        </span>
      </div>

      <form className="helpbot-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ask a wellness or support question..."
        />
        <button type="submit" aria-label="Send help question">
          <Send size={16} />
        </button>
      </form>
    </section>
  );
}

export default function HelpChatbot({ isPage = false, session = null }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(isPage);
  const [draft, setDraft] = useState("");
  const [wellness, setWellness] = useState(() => readWellnessState());
  const [journalCount, setJournalCount] = useState(() => readJournalEntries().length);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      from: "bot",
      text: "Hi, I’m the MindWell wellness guide. I can answer common health and wellbeing questions, suggest gentle habits, point students to support, and help you track daily care.",
      link: null,
    },
  ]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        WELLNESS_STORAGE_KEY,
        JSON.stringify(wellness),
      );
    }
  }, [wellness]);

  useEffect(() => {
    if (isPage) {
      setIsOpen(true);
      return undefined;
    }

    if (!isOpen || typeof window === "undefined") {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isPage]);

  useEffect(() => {
    setJournalCount(readJournalEntries().length);
  }, [location.pathname]);

  const currentPrompt =
    journalPrompts[wellness.promptIndex % journalPrompts.length];
  const waterGoalReached = wellness.waterGlasses >= 8;
  const fitnessGoalReached = wellness.fitnessMinutes >= 30;
  const isCompact = !isPage && location.pathname === "/";

  const pageHint = useMemo(() => {
    if (location.pathname === "/support") {
      return "You are on the Support page. I can help you understand student-friendly resources and urgent contacts.";
    }
    if (location.pathname === "/rituals") {
      return "You are on the Rituals page. I can suggest calming habits, movement, or sleep-friendly resets.";
    }
    if (location.pathname === "/journal") {
      return "You are on the Journal page. I can help with prompts, mood reflection, and positive habit ideas.";
    }
    if (location.pathname === "/community") {
      return "You are on the Community page. I can explain anonymous support and safer ways to share.";
    }
    if (location.pathname === "/faq") {
      return "You are on the FAQ page. I can answer questions directly or point you to the right section.";
    }
    return "Ask me about wellness, student support, routines, mood, water, fitness, or journaling.";
  }, [location.pathname]);

  function pushMessage(text) {
    const normalizedText = text.trim();

    if (!normalizedText) {
      return;
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      from: "user",
      text: normalizedText,
      link: null,
    };

    const reply = buildReply(normalizedText, {
      ...wellness,
      journalCount,
    });

    const botMessage = {
      id: `bot-${Date.now() + 1}`,
      from: "bot",
      text: reply.text,
      link: reply.link,
    };

    setMessages((current) => [...current, userMessage, botMessage]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    pushMessage(draft);
    setDraft("");
  }

  function updateMood(nextMood) {
    setWellness((current) => ({ ...current, mood: nextMood }));
  }

  function updateWater(change) {
    setWellness((current) => ({
      ...current,
      waterGlasses: Math.max(0, current.waterGlasses + change),
    }));
  }

  function updateFitness(change) {
    setWellness((current) => ({
      ...current,
      fitnessMinutes: Math.max(0, current.fitnessMinutes + change),
    }));
  }

  function rotatePrompt() {
    setWellness((current) => ({
      ...current,
      promptIndex: (current.promptIndex + 1) % journalPrompts.length,
    }));
  }

  const panel = (
    <HelpChatbotPanel
      canClose={!isPage}
      currentPrompt={currentPrompt}
      draft={draft}
      fitnessGoalReached={fitnessGoalReached}
      handleSubmit={handleSubmit}
      isCompact={isCompact}
      isPage={isPage}
      journalCount={journalCount}
      messages={messages}
      pageHint={pageHint}
      pushMessage={pushMessage}
      rotatePrompt={rotatePrompt}
      setDraft={setDraft}
      setIsOpen={setIsOpen}
      updateFitness={updateFitness}
      updateMood={updateMood}
      updateWater={updateWater}
      waterGoalReached={waterGoalReached}
      wellness={wellness}
      session={session}
    />
  );

  if (isPage) {
    return (
      <main className="helpbot-page">
        <section className="helpbot-page-shell">
          <div className="helpbot-page-top">
            <Link to="/" className="chat-back">
              <ArrowLeft size={18} />
              Back to home
            </Link>
            <p className="eyebrow">Wellness assistant</p>
            <h1>Your dedicated space for wellness questions, support guidance, and daily check-ins.</h1>
            <p className="helpbot-page-lead">
              Ask questions naturally, track a few small care habits, and jump to the right MindWell resource when you need it.
            </p>
          </div>

          {panel}
        </section>
      </main>
    );
  }

  return (
    <div className={isOpen ? "helpbot is-open" : "helpbot"}>
      {isOpen ? (
        <>
          <button
            type="button"
            className="helpbot-backdrop"
            onClick={() => setIsOpen(false)}
            aria-label="Close chatbot backdrop"
          />

          {panel}
        </>
      ) : null}

      <button
        type="button"
        className={isCompact ? "helpbot-trigger helpbot-trigger-compact" : "helpbot-trigger"}
        onClick={() => setIsOpen(true)}
        aria-label="Wellness Help"
      >
        <MessageCircleQuestion size={18} />
        <span>{isCompact ? "Chat" : "Wellness Help"}</span>
      </button>
    </div>
  );
}
