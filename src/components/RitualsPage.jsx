import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Flower2, MoonStar, Play, Wind } from "lucide-react";

const dailyRituals = [
  "2-minute guided breathing before class or work",
  "Screen-off wind-down routine at night",
  "Name-your-feeling journaling prompt",
  "One kind text to a trusted friend",
];

const yogaSections = [
  {
    title: "Child's Pose",
    time: "1 to 2 minutes",
    description:
      "A folded resting pose that can help slow things down when the mind feels noisy or overstimulated.",
    steps: "Kneel, sit back toward your heels, stretch your arms forward, and let your forehead rest gently.",
  },
  {
    title: "Cat-Cow Flow",
    time: "6 slow breaths",
    description:
      "A soft spine movement that pairs breath with motion and can help release some physical tension.",
    steps: "On hands and knees, inhale to lift the chest, then exhale to round the back. Move slowly with your breath.",
  },
  {
    title: "Seated Forward Fold",
    time: "45 to 60 seconds",
    description:
      "A quiet stretch for slowing down, especially after sitting for a long time or carrying stress in the body.",
    steps: "Sit tall with legs extended, hinge forward gently, and stop early if your body asks for less.",
  },
  {
    title: "Legs Up the Wall",
    time: "3 to 5 minutes",
    description:
      "A restorative position that invites stillness and can feel grounding at the end of the day.",
    steps: "Lie near a wall, extend your legs upward, soften the shoulders, and breathe without forcing anything.",
  },
];

export default function RitualsPage() {
  return (
    <main className="rituals-page">
      <section className="rituals-shell">
        <div className="rituals-page-top">
          <Link to="/" className="chat-back">
            <ArrowLeft size={18} />
            Back to home
          </Link>

          <p className="eyebrow">Daily rituals</p>
          <h1>Small daily rituals and gentle yoga sections for easing the mind.</h1>
          <p className="rituals-page-lead">
            This page brings together calming routines and beginner-friendly yoga practices that
            support a slower pace. Move gently, avoid pain, and stop if something feels wrong for
            your body.
          </p>
        </div>

        <div className="rituals-page-grid">
          <section className="rituals-main-card">
            <div className="rituals-card-heading">
              <p className="auth-eyebrow">Everyday rhythm</p>
              <h2>Simple rituals that are easy to return to.</h2>
            </div>

            <div className="rituals-page-list">
              {dailyRituals.map((ritual, index) => (
                <div key={ritual} className="ritual-item">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{ritual}</p>
                </div>
              ))}
            </div>
          </section>

          <aside className="rituals-side-card">
            <div className="chat-safety-item">
              <Wind size={18} />
              <span>Pair each ritual with slower breathing instead of trying to rush through it.</span>
            </div>
            <div className="chat-safety-item">
              <MoonStar size={18} />
              <span>Gentle evening routines often feel more helpful when lights and screens are softer.</span>
            </div>
            <div className="chat-safety-item">
              <Flower2 size={18} />
              <span>Yoga here is for light calming support, not for pushing flexibility or performance.</span>
            </div>
          </aside>
        </div>

        <section className="yoga-section">
          <div className="section-heading">
            <p className="eyebrow">
              <Play size={16} />
              Yoga for calm
            </p>
            <h2>Gentle sections that may help the body settle with the mind.</h2>
          </div>

          <div className="yoga-grid">
            {yogaSections.map((pose) => (
              <article key={pose.title} className="yoga-card">
                <span className="community-preview-tag">{pose.time}</span>
                <h3>{pose.title}</h3>
                <p>{pose.description}</p>
                <div className="yoga-steps">
                  <strong>How to try it</strong>
                  <span>{pose.steps}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="support-warning">
          <span>
            If the user feels dizzy, painful strain, panic, or worsening distress during a routine,
            pause and choose rest or professional support instead.
          </span>
        </div>

        <Link to="/journal" className="primary-action rituals-next-link">
          Pair this with your journal
          <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  );
}
