import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Award,
  Calendar,
  Camera,
  CheckCircle2,
  Circle,
  ExternalLink,
  Film,
  Leaf,
  Megaphone,
  PenSquare,
  Users,
} from "lucide-react";

const spotlightCards = [
  {
    icon: Camera,
    title: "School activity galleries",
    text: "Upload photos from sports days, assemblies, clubs, performances, trips, and classroom events so the school story stays visible.",
  },
  {
    icon: Leaf,
    title: "Tree planting and cleanup events",
    text: "Show environmental action with photo albums, short reports, volunteer captions, and video coverage from school-led service work.",
  },
  {
    icon: Award,
    title: "Projects and achievements",
    text: "Feature science projects, art showcases, competitions, and academic wins so student effort gets the spotlight it deserves.",
  },
];

const publishingJourney = [
  {
    title: "Capture school life",
    text: "Collect photos, short clips, and captions from activities, events, and community projects.",
  },
  {
    title: "Organize by theme",
    text: "Sort content into activities, green events, student projects, achievements, and blog stories.",
  },
  {
    title: "Publish and inspire",
    text: "Let families, visitors, and students see a living record of school growth and participation.",
  },
];

const storyFormats = [
  "Photo albums for assemblies, sports days, fairs, and club activities",
  "Event pages for tree planting campaigns and campus cleanup drives",
  "Student project stories with outcomes, reflections, and achievement highlights",
];

const publishingModes = {
  Activities: {
    copy:
      "Show everyday school life through galleries, event recaps, class moments, performances, and club participation.",
    meta: ["School events", "Class stories", "Club showcases"],
  },
  "Green Events": {
    copy:
      "Use videos and photos to document school-led tree planting, recycling, and cleanup efforts in a way that feels real and active.",
    meta: ["Tree planting", "Cleanup drives", "Eco clubs"],
  },
  Blogs: {
    copy:
      "Give students a place to write about projects, experiences, achievements, and lessons learned in their own voice.",
    meta: ["Student voice", "Reflections", "Creative writing"],
  },
};

const projectVideos = [
  {
    title: "Tree planting video placeholder",
    description:
      "This now uses a direct embeddable video URL so the player works reliably. Replace it with the school's actual tree planting YouTube video when you have it.",
    embed: "https://www.youtube.com/embed/0XTBYMfZyrM",
    href: "https://www.youtube.com/watch?v=0XTBYMfZyrM",
  },
  {
    title: "Cleanup day video placeholder",
    description:
      "This is a working placeholder embed for the cleanup section. You can swap the URL with a direct school cleanup video link later.",
    embed: "https://www.youtube.com/embed/aXItOY0sLRY",
    href: "https://www.youtube.com/watch?v=aXItOY0sLRY",
  },
  {
    title: "Student media video placeholder",
    description:
      "This direct embed keeps the student media slot working for now. Replace it with a real school blog, news, or student storytelling video when ready.",
    embed: "https://www.youtube.com/embed/Ev6yE55kYGw",
    href: "https://www.youtube.com/watch?v=Ev6yE55kYGw",
  },
];

const showcaseMoments = [
  {
    month: "Mar",
    day: "22",
    title: "Cleanup Day Feature",
    text: "Publish before-and-after photos, student quotes, and short video clips from campus or neighborhood cleanup work.",
  },
  {
    month: "Apr",
    day: "05",
    title: "Tree Planting Week",
    text: "Track how many seedlings were planted, which classes joined, and what the environmental goals were.",
  },
  {
    month: "Jun",
    day: "18",
    title: "Projects Showcase",
    text: "Feature exhibitions, presentations, science builds, art projects, and reflections from the students who created them.",
  },
  {
    month: "Jul",
    day: "10",
    title: "Student Blog Roundup",
    text: "Highlight the strongest student-written posts from the term so visitors can hear the school voice directly.",
  },
];

const studentVoices = [
  {
    text: "The project page feels more real when people can watch students planting trees instead of only reading about it.",
    author: "Eco Club idea",
  },
  {
    text: "Putting blogs, projects, and school activity videos in one place makes the website feel alive.",
    author: "Student media team idea",
  },
];

const communityHighlights = [
  "A full project page instead of stacking every detail on the homepage",
  "Space for school videos, photos, captions, achievements, and student articles",
  "An easier way for visitors to understand what students are actually doing",
];

const blogPromises = [
  "Student-written posts about environmental work, school events, and project journeys",
  "A writing space that turns activities into stories people can revisit later",
  "A media section that grows into a digital archive of school voice and effort",
];

const faqItems = [
  {
    question: "Why move this content to its own page?",
    answer:
      "A dedicated page gives the school project room for galleries, videos, blog content, and event storytelling without making the homepage feel crowded.",
  },
  {
    question: "Can the sample videos be replaced with one school&apos;s real videos?",
    answer:
      "Yes. The current setup is ready for swapping in direct YouTube or hosted video links from the school&apos;s own channel whenever they are available.",
  },
  {
    question: "What should the page highlight first?",
    answer:
      "Tree planting, cleanup work, school activities, student projects, achievements, and student-written blogs are strong first categories because they show action and community impact.",
  },
];

function ShowcaseBoard() {
  const [selectedMode, setSelectedMode] = useState("Activities");
  const modes = Object.keys(publishingModes);

  return (
    <div className="wellness-panel">
      <div className="panel-heading">
        <span className="panel-icon">
          <Megaphone size={18} />
        </span>
        <div>
          <p className="eyebrow">Content Studio</p>
          <h3>What should this page publish next?</h3>
        </div>
      </div>

      <div className="mood-switcher" role="tablist" aria-label="Publishing modes">
        {modes.map((mode) => (
          <button
            key={mode}
            type="button"
            className={
              selectedMode === mode ? "mood-chip is-active" : "mood-chip"
            }
            onClick={() => setSelectedMode(mode)}
          >
            {selectedMode === mode ? (
              <CheckCircle2 size={16} />
            ) : (
              <Circle size={16} />
            )}
            {mode}
          </button>
        ))}
      </div>

      <p className="panel-copy">{publishingModes[selectedMode].copy}</p>

      <div className="panel-meta">
        {publishingModes[selectedMode].meta.map((item) => (
          <span key={item}>
            <Calendar size={16} />
            {item}
          </span>
        ))}
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

export default function ProjectsPage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="projects-page">
      <section className="projects-shell">
        <div className="resources-top">
          <Link to="/" className="chat-back">
            <ArrowLeft size={18} />
            Back to home
          </Link>

          <p className="eyebrow">Dedicated project page</p>
          <h1>School activities, tree planting, cleanup work, achievements, blogs, and videos in one place.</h1>
          <p className="resources-lead">
            This page is the full project showcase. It is designed for schools
            that want to publish photos, celebrate student achievements, tell
            stories through student blogs, and include video examples of
            schools taking part in tree planting and cleanup activities.
          </p>
        </div>

        <section className="hero-section project-hero-section">
          <div className="hero-copy">
            <p className="hero-kicker">
              <Film size={16} />
              Richer storytelling away from the homepage
            </p>

            <h2 className="project-section-title">
              Give the project enough room for <span>photos, blogs, and school videos.</span>
            </h2>

            <p className="hero-description">
              Instead of squeezing everything onto the landing page, this
              layout creates one clear destination where visitors can browse
              school community work in a more engaging way.
            </p>
          </div>

          <div className="hero-visual" aria-label="Project page overview">
            <div className="hero-visual-glow" />
            <div className="hero-card card-main">
              <div className="card-badge">What belongs here</div>
              <h2>Show the work, not just the idea.</h2>
              <p>
                The page is built to spotlight visible student action, from
                green events to project showcases and student-written stories.
              </p>

              <div className="card-route">
                <div className="route-step">
                  <span>01</span>
                  <div className="route-step-copy">
                    <strong>Photos of school activities</strong>
                    <p>Debates, clubs, sports, performances, fairs, and trips.</p>
                  </div>
                </div>
                <div className="route-step">
                  <span>02</span>
                  <div className="route-step-copy">
                    <strong>Tree planting and cleanup videos</strong>
                    <p>Real school action that visitors can watch, not just imagine.</p>
                  </div>
                </div>
                <div className="route-step">
                  <span>03</span>
                  <div className="route-step-copy">
                    <strong>Projects, wins, and student blogs</strong>
                    <p>A lasting record of effort, talent, and growth.</p>
                  </div>
                </div>
              </div>
            </div>

            <ShowcaseBoard />
          </div>
        </section>

        <section className="resource-section">
          <div className="section-heading">
            <p className="eyebrow">Platform focus</p>
            <h2>Everything here is shaped around visible student participation.</h2>
          </div>

          <div className="support-grid">
            {spotlightCards.map((card) => {
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

        <section className="resource-section">
          <div className="section-heading">
            <p className="eyebrow">
              <Film size={16} />
              School videos
            </p>
            <h2>Embed school-centered video examples for tree planting, cleanup, and student media.</h2>
            <p className="section-text">
              The earlier YouTube search-style embeds were unreliable, so this
              section now uses direct video embeds that load properly. Each one
              is a temporary placeholder and is ready to be replaced with a
              school&apos;s actual YouTube video URL later.
            </p>
          </div>

          <div className="resource-video-grid">
            {projectVideos.map((video) => (
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
                    href={video.href}
                    target="_blank"
                    rel="noreferrer"
                    className="resource-inline-link"
                  >
                    Open in YouTube
                    <ExternalLink size={16} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="ritual-section">
          <div className="ritual-copy">
            <p className="eyebrow">Story formats</p>
            <h2>Make the project page feel like a living school magazine.</h2>
            <p className="section-text">
              The strongest version of this idea blends galleries, event
              summaries, video moments, project features, and student-written
              stories into one easy-to-browse experience.
            </p>
          </div>

          <div className="community-card ritual-preview-card">
            <div className="community-copy">
              <div className="community-list">
                {storyFormats.map((item) => (
                  <div key={item} className="community-list-item">
                    <CheckCircle2 size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="community-cta">
              <div className="community-preview">
                <span className="community-preview-tag">Designed for school pride</span>
                <p>
                  This page can become a public-facing record of school spirit,
                  environmental responsibility, creativity, and student voice.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="resource-section">
          <div className="section-heading narrow">
            <p className="eyebrow">How it works</p>
            <h2>Three steps to turn activities into a stronger school showcase.</h2>
          </div>

          <div className="journey-grid">
            {publishingJourney.map((step, index) => (
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

        <section className="resource-section">
          <div className="section-heading">
            <p className="eyebrow">
              <Calendar size={16} />
              Coverage ideas
            </p>
            <h2>Use recurring events to keep the project page active.</h2>
          </div>

          <div className="awareness-grid">
            {showcaseMoments.map((item) => (
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
          {studentVoices.map((quote) => (
            <blockquote key={quote.author} className="quote-card">
              <PenSquare size={20} />
              <p>{quote.text}</p>
              <footer>{quote.author}</footer>
            </blockquote>
          ))}
        </section>

        <section className="community-section">
          <div className="community-card">
            <div className="community-copy">
              <p className="eyebrow">
                <Users size={16} />
                School community
              </p>
              <h2>Help visitors see what students are actually doing.</h2>
              <p className="section-text">
                When a page combines photos, clips, student writing, and
                achievements, it feels less like a noticeboard and more like an
                active school community.
              </p>

              <div className="community-list">
                {communityHighlights.map((item) => (
                  <div key={item} className="community-list-item">
                    <CheckCircle2 size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="community-cta">
              <div className="community-preview">
                <span className="community-preview-tag">Better structure</span>
                <p>
                  Keeping this material on its own page makes the homepage
                  cleaner while giving the project room to grow over time.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="community-section">
          <div className="community-card journal-preview-card">
            <div className="community-copy">
              <p className="eyebrow">
                <PenSquare size={16} />
                Student blog
              </p>
              <h2>Let students write the story behind the photos and videos.</h2>
              <p className="section-text">
                Blogs bring meaning to the media. Students can explain what a
                cleanup day taught them, how a project was built, or why a tree
                planting activity mattered to the school.
              </p>

              <div className="community-list">
                {blogPromises.map((item) => (
                  <div key={item} className="community-list-item">
                    <CheckCircle2 size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="community-cta">
              <div className="community-preview">
                <span className="community-preview-tag">Student voice matters</span>
                <p>
                  A blog section turns the project page from a gallery into a
                  platform where students can narrate their own experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="faq-section" id="faq">
          <div className="section-heading narrow">
            <p className="eyebrow">Helpful clarity</p>
            <h2>Questions that come up when shaping this page.</h2>
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
      </section>
    </main>
  );
}
