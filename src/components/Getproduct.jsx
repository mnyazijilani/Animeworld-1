import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  Calendar,
  CheckCircle2,
  Circle,
  HeartHandshake,
  MessageCircle,
  MessageSquareHeart,
  MoonStar,
  Play,
  ShieldCheck,
  Sparkles,
  TimerReset,
} from "lucide-react";

const supportCards = [
  {
    icon: HeartHandshake,
    title: "Talk to someone safe",
    text: "Start with trusted institutions that can offer mental-health guidance, referral, and emergency support.",
  },
  {
    icon: MoonStar,
    title: "Find support quickly",
    text: "The section below gives direct phone numbers so the user can reach real help without hunting for contacts.",
  },
  {
    icon: ShieldCheck,
    title: "Know when it is urgent",
    text: "If someone is in immediate danger, treat it as an emergency and call for urgent help right away.",
  },
];

const ritualPromises = [
  "Gentle yoga sections for easing the mind",
  "Short rituals you can repeat morning or night",
  "A calmer place to build a personal reset routine",
];

const journey = [
  {
    title: "Check in",
    text: "Notice how today feels with one quick mood reflection.",
  },
  {
    title: "Choose support",
    text: "Pick a calming ritual, story, or conversation path that fits your energy.",
  },
  {
    title: "Keep momentum",
    text: "Return to your plan tomorrow with tiny wins already waiting for you.",
  },
];

const quotes = [
  {
    text: "The journaling prompts felt simple enough to actually use on a hard day.",
    author: "Amina, form 4 student",
  },
  {
    text: "It feels less like a lecture and more like someone helping me breathe again.",
    author: "Kevin, first-year student",
  },
];

const faqItems = [
  {
    question: "Is this for emergencies?",
    answer:
      "No. This homepage is for everyday wellbeing support and self-guided care. In an emergency, contact local emergency services or a qualified crisis line immediately.",
  },
  {
    question: "Do I need an account to explore?",
    answer:
      "No. The landing page is open and designed to help visitors understand the support experience before signing in.",
  },
  {
    question: "Who is this built for?",
    answer:
      "The tone and structure are especially friendly for students and young adults, but the content can support anyone looking for calm, practical mental-health guidance.",
  },
];

const communityPromises = [
  "Join with an automatic anonymous name",
  "Switch between topic-based rooms",
  "Share feelings without posting personal details",
];

const journalPromises = [
  "Write what you went through each day",
  "Choose the mood that best matches the entry",
  "Keep a personal timeline of reflections",
];

const awarenessDays = [
  {
    month: "April",
    day: "07",
    title: "World Health Day",
    text: "A gentle reminder to look at health as a whole, including sleep, stress, movement, and emotional wellbeing.",
  },
  {
    month: "May",
    day: "28",
    title: "Menstrual Hygiene Day",
    text: "Useful for opening kinder, more informed conversations about periods, dignity, and everyday health support.",
  },
  {
    month: "July",
    day: "24",
    title: "International Self-Care Day",
    text: "A good day to revisit small habits that protect energy before life starts to feel too heavy again.",
  },
  {
    month: "September",
    day: "10",
    title: "World Suicide Prevention Day",
    text: "A moment to encourage help-seeking, honest check-ins, and safer conversations when someone may be struggling.",
  },
  {
    month: "October",
    day: "10",
    title: "World Mental Health Day",
    text: "An anchor date for reflection, awareness, and sharing practical support for emotional wellbeing.",
  },
  {
    month: "December",
    day: "01",
    title: "World AIDS Day",
    text: "A chance to hold space for awareness, stigma reduction, and compassionate community health conversations.",
  },
];

function MoodMeter() {
  const [selectedMood, setSelectedMood] = useState("Steady");

  const moodCopy = useMemo(
    () => ({
      Overwhelmed:
        "Start with a two-minute breathing reset and reduce today's plan to one next step.",
      Steady:
        "You're in a good place to protect your balance with one intentional habit.",
      Hopeful:
        "Lean into the energy. This is a lovely moment for gratitude or reaching out to someone.",
    }),
    [],
  );

  const moods = ["Overwhelmed", "Steady", "Hopeful"];

  return (
    <div className="wellness-panel">
      <div className="panel-heading">
        <span className="panel-icon">
          <Brain size={18} />
        </span>
        <div>
          <p className="eyebrow">Daily Check-In</p>
          <h3>How are you arriving today?</h3>
        </div>
      </div>

      <div className="mood-switcher" role="tablist" aria-label="Mood options">
        {moods.map((mood) => (
          <button
            key={mood}
            type="button"
            className={
              selectedMood === mood ? "mood-chip is-active" : "mood-chip"
            }
            onClick={() => setSelectedMood(mood)}
          >
            {selectedMood === mood ? (
              <CheckCircle2 size={16} />
            ) : (
              <Circle size={16} />
            )}
            {mood}
          </button>
        ))}
      </div>

      <p className="panel-copy">{moodCopy[selectedMood]}</p>

      <div className="panel-meta">
        <span>
          <TimerReset size={16} />3 minute reset
        </span>
        <span>
          <Calendar size={16} />
          Gentle daily rhythm
        </span>
      </div>
    </div>
  );
}

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div className={isOpen ? "faq-item is-open" : "faq-item"}>
      <button
        type="button"
        className="faq-trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{item.question}</span>
        <span className="faq-symbol">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen ? <p className="faq-answer">{item.answer}</p> : null}
    </div>
  );
}

export default function Getproduct() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="mental-home">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="hero-kicker">
            <Sparkles size={16} />
            Mental wellness that feels warm, practical, and human
          </p>

          <h1 className="hero-title">
            A softer place to <span>pause, breathe, and begin again.</span>
          </h1>

          <p className="hero-description">
            MindWell helps students and young adults build everyday
            mental-health habits with calm guidance, supportive stories, and
            simple rituals that fit real life.
          </p>

          <div className="hero-actions">
            <Link className="primary-action" to="/support">
              Explore support
              <ArrowRight size={18} />
            </Link>
            <Link className="secondary-action" to="/rituals">
              <Play size={18} />
              See daily rituals
            </Link>
          </div>

          <div className="hero-proof">
            <div>
              <strong>12k+</strong>
              <span>guided check-ins completed</span>
            </div>
            <div>
              <strong>86%</strong>
              <span>say the routines feel easy to return to</span>
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-label="Mental wellness overview card">
          <div className="hero-visual-glow" />
          <div className="hero-card card-main">
            <div className="card-badge">Today&apos;s rhythm</div>
            <h2>Small support, right when it matters.</h2>
            <p>
              Start with one reflection, one reset, and one act of care. That is
              enough for today.
            </p>

            <div className="card-route">
              <div className="route-step">
                <span>01</span>
                <div className="route-step-copy">
                  <strong>Check your mood</strong>
                  <p>
                    Start by noticing what feels heavy, calm, or hopeful today.
                  </p>
                </div>
              </div>
              <div className="route-step">
                <span>02</span>
                <div className="route-step-copy">
                  <strong>Choose a grounding ritual</strong>
                  <p>
                    Pick one calming action that matches your energy right now.
                  </p>
                </div>
              </div>
              <div className="route-step">
                <span>03</span>
                <div className="route-step-copy">
                  <strong>Reach out for support</strong>
                  <p>
                    Use extra help when you need care beyond self-guided tools.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <MoodMeter />
        </div>
      </section>

      <section className="support-section" id="support">
        <div className="section-heading">
          <p className="eyebrow">Core support</p>
          <h2>
            Everything on the page is designed to lower the barrier to care.
          </h2>
        </div>

        <div className="support-grid">
          {supportCards.map((card) => {
            const Icon = card.icon;

            return (
              <article key={card.title} className="support-card">
                <span className="support-icon">
                  <Icon size={20} />
                </span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="ritual-section" id="rituals">
        <div className="ritual-copy">
          <p className="eyebrow">Daily rituals</p>
          <h2>Build steadiness with tiny actions you can actually keep.</h2>
          <p className="section-text">
            Open the rituals page for a fuller set of calming habits and gentle
            yoga sections that can support a quieter mind.
          </p>
        </div>

        <div className="community-card ritual-preview-card">
          <div className="community-copy">
            <div className="community-list">
              {ritualPromises.map((item) => (
                <div key={item} className="community-list-item">
                  <CheckCircle2 size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="community-cta">
            <div className="community-preview">
              <span className="community-preview-tag">Yoga and rhythm</span>
              <p>
                Includes light poses like Child&apos;s Pose, Cat-Cow Flow, and
                Legs Up the Wall, alongside simple routines for the rest of the
                day.
              </p>
            </div>

            <Link to="/rituals" className="secondary-action ritual-page-link">
              Open rituals page
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="journey-section">
        <div className="section-heading narrow">
          <p className="eyebrow">Simple journey</p>
          <h2>
            Three steps that make support feel calm instead of complicated.
          </h2>
        </div>

        <div className="journey-grid">
          {journey.map((step, index) => (
            <article key={step.title} className="journey-card">
              <span className="journey-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="awareness-section">
        <div className="section-heading">
          <p className="eyebrow">
            <Calendar size={16} />
            Awareness calendar
          </p>
          <h2>
            Health awareness days that can spark timely care and conversation.
          </h2>
          <p className="section-text">
            These annual dates can help schools, families, and friend groups
            make space for reflection, education, and early support.
          </p>
        </div>

        <div className="awareness-grid">
          {awarenessDays.map((item) => (
            <article key={item.title} className="awareness-card">
              <div className="awareness-date">
                <span>{item.month}</span>
                <strong>{item.day}</strong>
              </div>
              <div className="awareness-copy">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="quote-section">
        {quotes.map((quote) => (
          <blockquote key={quote.author} className="quote-card">
            <MessageSquareHeart size={20} />
            <p>{quote.text}</p>
            <footer>{quote.author}</footer>
          </blockquote>
        ))}
      </section>

      <section className="community-section">
        <div className="community-card">
          <div className="community-copy">
            <p className="eyebrow">
              <MessageCircle size={16} />
              Anonymous group support
            </p>
            <h2>
              Need to say how something feels and hear from others who get it?
            </h2>
            <p className="section-text">
              Join the MindWell community room to talk anonymously about stress,
              friendships, overthinking, or small wins. Everyone enters with a
              generated alias, so the focus stays on the feeling, not the
              identity.
            </p>

            <div className="community-list">
              {communityPromises.map((item) => (
                <div key={item} className="community-list-item">
                  <CheckCircle2 size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="community-cta">
            <div className="community-preview">
              <span className="community-preview-tag">Now open</span>
              <p>
                Anonymous rooms for sharing what feels heavy, what felt unfair,
                or what small win made the day easier.
              </p>
            </div>

            <Link to="/community" className="primary-action">
              Enter the anonymous chat
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="community-section">
        <div className="community-card journal-preview-card">
          <div className="community-copy">
            <p className="eyebrow">
              <Brain size={16} />
              Daily journal
            </p>
            <h2>
              Some feelings need a private page before they need another person.
            </h2>
            <p className="section-text">
              Use the MindWell journal to type what you go through on a daily
              basis, track your mood, and slowly build a record of what helps,
              what hurts, and what keeps changing.
            </p>

            <div className="community-list">
              {journalPromises.map((item) => (
                <div key={item} className="community-list-item">
                  <CheckCircle2 size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="community-cta">
            <div className="community-preview">
              <span className="community-preview-tag">Private space</span>
              <p>
                A calmer place to write about your day when you want reflection
                without the pressure of sharing it out loud.
              </p>
            </div>

            <Link to="/journal" className="primary-action">
              Open your journal
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div className="section-heading narrow">
          <p className="eyebrow">Helpful clarity</p>
          <h2>Questions people often have before they begin.</h2>
        </div>

        <div className="faq-list">
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
