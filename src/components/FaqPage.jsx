import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, HelpCircle } from "lucide-react";

const faqItems = [
  {
    question: "Is MindWell for emergencies?",
    answer:
      "No. MindWell is designed for everyday support, reflection, and guidance. If someone is in immediate danger or may harm themselves or others, emergency services should be contacted right away.",
  },
  {
    question: "Do I need an account to use MindWell?",
    answer:
      "No. Visitors can explore the homepage and learn about the support tools before signing in. Some features may feel more personal once an account flow is connected later.",
  },
  {
    question: "Is the anonymous chat really anonymous?",
    answer:
      "Inside the current app, members use generated aliases instead of real names. The present version is browser-based, so the experience is private to the device rather than a full production chat system.",
  },
  {
    question: "Where are journal entries stored?",
    answer:
      "Journal entries are currently stored in the browser on the same device using local storage. That means they stay available on that browser unless cleared manually.",
  },
  {
    question: "What are daily rituals meant to do?",
    answer:
      "Daily rituals are small calming practices like breathing, journaling, slower evenings, and gentle yoga sections that help create steadier mental-health habits over time.",
  },
  {
    question: "Can MindWell replace a therapist or doctor?",
    answer:
      "No. MindWell can support reflection and encourage help-seeking, but it does not replace professional mental-health care, medical advice, diagnosis, or treatment.",
  },
];

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div className={isOpen ? "faq-item is-open" : "faq-item"}>
      <button type="button" className="faq-trigger" onClick={onToggle} aria-expanded={isOpen}>
        <span>{item.question}</span>
        <span className="faq-symbol">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen ? <p className="faq-answer">{item.answer}</p> : null}
    </div>
  );
}

export default function FaqPage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="faq-page">
      <section className="faq-page-shell">
        <div className="faq-page-top">
          <Link to="/" className="chat-back">
            <ArrowLeft size={18} />
            Back to home
          </Link>

          <p className="eyebrow">
            <HelpCircle size={16} />
            Common questions
          </p>
          <h1>The questions people ask most often about MindWell.</h1>
          <p className="faq-page-lead">
            This page collects the most common questions about support, privacy, journaling,
            anonymous chat, and how the app should be used.
          </p>
        </div>

        <div className="faq-page-list faq-list">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={item.question}
              item={item}
              isOpen={openFaq === index}
              onToggle={() => setOpenFaq(openFaq === index ? -1 : index)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
