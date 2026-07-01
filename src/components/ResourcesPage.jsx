import { Link } from "react-router-dom";
import {
  ArrowDownToLine,
  ArrowLeft,
  ExternalLink,
  FileText,
  Film,
  Globe2,
  Megaphone,
} from "lucide-react";

const posters = [
  {
    title: "Take a Breath Poster",
    description:
      "A calm classroom or dorm-room poster that reminds students to pause, breathe, and reset before stress builds.",
    href: "/resources/take-a-breath-poster.svg",
  },
  {
    title: "Hydration Habits Poster",
    description:
      "A bright visual cue for water, movement, and short recovery moments during study days.",
    href: "/resources/hydration-habits-poster.svg",
  },
];

const brochures = [
  {
    title: "Student Wellness Brochure",
    description:
      "A printable brochure covering sleep, stress, hydration, movement, and help-seeking reminders for students.",
    href: "/resources/student-wellness-brochure.html",
  },
  {
    title: "Mental Health Support Guide",
    description:
      "A short guide for noticing early warning signs, starting conversations, and reaching for support sooner.",
    href: "/resources/mental-health-support-guide.html",
  },
];

const videos = [
  {
    title: "Short Breathing Reset",
    description:
      "A quick guided reset students can use before class, revision, or sleep.",
    embed: "https://www.youtube.com/embed/aXItOY0sLRY",
  },
  {
    title: "Gentle Desk Stretch Routine",
    description:
      "Simple movements for loosening tension after long periods of reading or screen time.",
    embed: "https://www.youtube.com/embed/Ev6yE55kYGw",
  },
  {
    title: "Understanding the Sustainable Development Goals",
    description:
      "A short educational explainer that helps connect daily wellbeing to wider public-health goals.",
    embed: "https://www.youtube.com/embed/0XTBYMfZyrM",
  },
];

const sdgFacts = [
  {
    value: "SDG 3",
    label: "Focuses on good health and wellbeing for people of all ages.",
  },
  {
    value: "1 goal",
    label: "Brings together mental health, disease prevention, maternal care, and stronger health systems.",
  },
  {
    value: "2030",
    label: "Is the target year for the wider Sustainable Development Goals agenda.",
  },
];

const sdgHighlights = [
  "Health is broader than treatment. It includes prevention, emotional wellbeing, safety, and equitable access to care.",
  "Student-friendly health information matters because early support can reduce avoidable crisis situations later.",
  "Good health outcomes are tied to habits like hydration, movement, sleep, mental-health literacy, and timely referrals.",
  "SDG 3 connects individual wellbeing with stronger communities, schools, clinics, and public-health systems.",
];

function DownloadCard({ item, icon: Icon }) {
  return (
    <article className="resource-download-card">
      <div className="resource-download-top">
        <span className="resource-icon">
          <Icon size={18} />
        </span>
        <h3>{item.title}</h3>
      </div>
      <p>{item.description}</p>
      <a href={item.href} download className="primary-action resource-download-link">
        Download
        <ArrowDownToLine size={18} />
      </a>
    </article>
  );
}

export default function ResourcesPage() {
  return (
    <main className="resources-page">
      <section className="resources-shell">
        <div className="resources-top">
          <Link to="/" className="chat-back">
            <ArrowLeft size={18} />
            Back to home
          </Link>

          <p className="eyebrow">Resources library</p>
          <h1>Downloadable health resources, learning materials, and SDG 3 highlights.</h1>
          <p className="resources-lead">
            This page brings together practical materials that schools, student
            groups, and families can reuse for awareness, education, and
            everyday healthy habits.
          </p>
        </div>

        <section className="resource-section">
          <div className="section-heading">
            <p className="eyebrow">
              <Megaphone size={16} />
              Downloadable posters
            </p>
            <h2>Ready-to-use visuals for noticeboards, classrooms, and peer spaces.</h2>
          </div>

          <div className="resource-download-grid">
            {posters.map((item) => (
              <DownloadCard key={item.title} item={item} icon={Megaphone} />
            ))}
          </div>
        </section>

        <section className="resource-section">
          <div className="section-heading">
            <p className="eyebrow">
              <FileText size={16} />
              PDFs and brochures
            </p>
            <h2>Printable guides that make health advice easier to share and revisit.</h2>
          </div>

          <div className="resource-download-grid">
            {brochures.map((item) => (
              <DownloadCard key={item.title} item={item} icon={FileText} />
            ))}
          </div>
        </section>

        <section className="resource-section">
          <div className="section-heading">
            <p className="eyebrow">
              <Film size={16} />
              Videos and educational materials
            </p>
            <h2>Short explainers that support healthy routines and public-health understanding.</h2>
          </div>

          <div className="resource-video-grid">
            {videos.map((video) => (
              <article key={video.title} className="resource-video-card">
                <div className="resource-video-frame">
                  <iframe
                    src={video.embed}
                    title={video.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="resource-video-copy">
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                  <a
                    href={video.embed.replace("/embed/", "/watch?v=")}
                    target="_blank"
                    rel="noreferrer"
                    className="resource-inline-link"
                  >
                    Open video
                    <ExternalLink size={16} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="resource-section">
          <div className="section-heading">
            <p className="eyebrow">
              <Globe2 size={16} />
              SDG 3 facts and statistics
            </p>
            <h2>Quick facts that connect personal wellbeing to a global health goal.</h2>
          </div>

          <div className="resource-fact-grid">
            {sdgFacts.map((fact) => (
              <article key={fact.value} className="resource-fact-card">
                <strong>{fact.value}</strong>
                <p>{fact.label}</p>
              </article>
            ))}
          </div>

          <div className="resource-highlights">
            {sdgHighlights.map((item) => (
              <div key={item} className="resource-highlight-item">
                <span className="resource-highlight-dot" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
