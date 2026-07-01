import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageCircleQuestion, Send, X } from "lucide-react";

const quickQuestions = [
  "How do I get help?",
  "Where is the journal?",
  "What is the anonymous chat?",
  "Where are daily rituals?",
  "Can I read common questions?",
];

function buildReply(message) {
  const text = message.toLowerCase();

  if (text.includes("help") || text.includes("support") || text.includes("phone")) {
    return {
      text: "Open the Support page for institutions and emergency contacts that may help when mental health feels too heavy.",
      link: { to: "/support", label: "Go to Support" },
    };
  }

  if (text.includes("journal") || text.includes("write") || text.includes("daily")) {
    return {
      text: "The Journal page is your private place to write what you go through each day and save reflections on this device.",
      link: { to: "/journal", label: "Open Journal" },
    };
  }

  if (text.includes("chat") || text.includes("anonymous") || text.includes("community")) {
    return {
      text: "The Community page lets members join with generated aliases and share feelings in a gentler anonymous group chat.",
      link: { to: "/community", label: "Open Community" },
    };
  }

  if (text.includes("ritual") || text.includes("yoga") || text.includes("calm")) {
    return {
      text: "The Rituals page has calming daily habits and gentle yoga sections like Child's Pose and Legs Up the Wall.",
      link: { to: "/rituals", label: "Open Rituals" },
    };
  }

  if (text.includes("faq") || text.includes("question") || text.includes("understand")) {
    return {
      text: "The FAQ page answers the most common questions about how MindWell works, privacy, journaling, and support.",
      link: { to: "/faq", label: "Open FAQ" },
    };
  }

  if (text.includes("sign in") || text.includes("login") || text.includes("account")) {
    return {
      text: "You can sign in or create an account from the top navigation. The app can still be explored without signing in.",
      link: { to: "/signin", label: "Go to Sign in" },
    };
  }

  return {
    text: "I can help you find Support, Rituals, Journal, Community, FAQ, or Sign in. Try asking about any of those.",
    link: null,
  };
}

export default function HelpChatbot() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      from: "bot",
      text: "Hi, I’m the MindWell guide. If something on the website feels unclear, ask me and I’ll point you to the right place.",
      link: null,
    },
  ]);

  const pageHint = useMemo(() => {
    if (location.pathname === "/support") {
      return "You are on the Support page. I can explain the contacts shown here.";
    }
    if (location.pathname === "/rituals") {
      return "You are on the Rituals page. I can point you to yoga or calming routines.";
    }
    if (location.pathname === "/journal") {
      return "You are on the Journal page. I can explain how entries are stored.";
    }
    if (location.pathname === "/community") {
      return "You are on the Community page. I can explain the anonymous chat.";
    }
    if (location.pathname === "/faq") {
      return "You are on the FAQ page. I can help you find a specific answer faster.";
    }
    return "Need help navigating MindWell?";
  }, [location.pathname]);

  function pushMessage(text) {
    const userMessage = {
      id: `user-${Date.now()}`,
      from: "user",
      text,
      link: null,
    };
    const reply = buildReply(text);
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

    if (!draft.trim()) {
      return;
    }

    pushMessage(draft.trim());
    setDraft("");
  }

  return (
    <div className={isOpen ? "helpbot is-open" : "helpbot"}>
      {isOpen ? (
        <section className="helpbot-panel" aria-label="Website help chatbot">
          <div className="helpbot-header">
            <div>
              <p className="helpbot-label">Website help</p>
              <h2>MindWell Guide</h2>
            </div>
            <button
              type="button"
              className="helpbot-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
            >
              <X size={18} />
            </button>
          </div>

          <p className="helpbot-hint">{pageHint}</p>

          <div className="helpbot-thread">
            {messages.map((message) => (
              <article
                key={message.id}
                className={message.from === "bot" ? "helpbot-message is-bot" : "helpbot-message is-user"}
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

          <form className="helpbot-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ask what this page does..."
            />
            <button type="submit" aria-label="Send help question">
              <Send size={16} />
            </button>
          </form>
        </section>
      ) : null}

      <button type="button" className="helpbot-trigger" onClick={() => setIsOpen(true)}>
        <MessageCircleQuestion size={18} />
        <span>Help</span>
      </button>
    </div>
  );
}
