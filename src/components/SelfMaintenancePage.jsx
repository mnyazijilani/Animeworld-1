import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Brain,
  CheckCircle2,
  Droplets,
  Dumbbell,
  GlassWater,
  MoonStar,
  Salad,
  ShieldPlus,
  Sparkles,
} from "lucide-react";

const balancedDietTips = [
  {
    title: "Body-building foods",
    foods: "Eggs, beans, peas, lentils, milk, yoghurt, fish, chicken, and lean meat.",
    note: "These help with growth, muscle repair, and staying full for longer.",
  },
  {
    title: "Energy-giving foods",
    foods: "Rice, ugali, sweet potatoes, potatoes, oats, whole grain bread, chapati, and maize.",
    note: "These give the body fuel for school, work, exercise, and daily activity.",
  },
  {
    title: "Protective foods",
    foods: "Spinach, sukuma wiki, carrots, tomatoes, cabbage, oranges, bananas, mangoes, watermelon, and avocado.",
    note: "These provide vitamins, minerals, and fiber that support overall health.",
  },
  {
    title: "Healthy extras",
    foods: "Groundnuts, seeds, peanut butter, olive oil, and small amounts of nuts.",
    note: "These can add healthy fats and help make meals more balanced.",
  },
];

const hydrationTips = [
  "Start the day with a glass of water before tea, coffee, or schoolwork.",
  "Sip water through the day instead of waiting until you feel very thirsty.",
  "Add fruit slices or keep a reusable bottle nearby if plain water is easy to forget.",
];

const sleepTimeline = [
  {
    time: "1 hour before sleep",
    title: "Start winding down",
    tip: "Reduce bright screens, lower the noise around you, and avoid heavy studying if possible.",
  },
  {
    time: "30 minutes before sleep",
    title: "Prepare your body",
    tip: "Wash up, change into something comfortable, and keep the room calmer and dimmer.",
  },
  {
    time: "10 minutes before sleep",
    title: "Quiet the mind",
    tip: "Try slow breathing, light stretching, or short journaling if your thoughts feel busy.",
  },
  {
    time: "Morning",
    title: "Protect the routine",
    tip: "Wake up at a similar time each day and get light movement or sunlight early if you can.",
  },
];

const hygienePractices = [
  "Wash hands with soap before eating and after using the bathroom.",
  "Bathe regularly and change into clean clothes to feel fresher and reduce irritation.",
  "Brush teeth morning and night, and keep nails short and clean.",
  "Clean bottles, lunch containers, and workout items so healthy routines stay hygienic too.",
];

const exerciseRoutines = [
  {
    title: "Light start",
    duration: "10 minutes",
    description: "Walk, stretch, and do two gentle mobility moves to wake the body up.",
  },
  {
    title: "Steady movement",
    duration: "20 minutes",
    description: "Alternate brisk walking, bodyweight squats, wall pushups, and easy marching in place.",
  },
  {
    title: "Reset routine",
    duration: "15 minutes",
    description: "Use yoga, deep breathing, and slower stretches when energy is low but movement still helps.",
  },
];

const habitChecklist = [
  "Ate a balanced meal",
  "Drank water regularly",
  "Moved my body today",
  "Practiced good hygiene",
  "Protected my sleep routine",
];

const emotions = [
  "Happy",
  "Excited",
  "Calm",
  "Hopeful",
  "Grateful",
  "Loved",
  "Tired",
  "Bored",
  "Stressed",
  "Anxious",
  "Sad",
  "Lonely",
  "Angry",
  "Frustrated",
  "Confused",
  "Overwhelmed",
];

export default function SelfMaintenancePage() {
  const [fitnessMinutes, setFitnessMinutes] = useState(30);
  const [waterGlasses, setWaterGlasses] = useState(4);
  const [checkedHabits, setCheckedHabits] = useState([]);
  const [selectedMood, setSelectedMood] = useState("Calm");

  const fitnessStatus = useMemo(() => {
    if (fitnessMinutes < 20) {
      return "A good start. Even a short walk or stretch still counts.";
    }

    if (fitnessMinutes < 45) {
      return "Nice balance. You are building steady daily movement.";
    }

    return "Strong effort today. Remember recovery, hydration, and rest too.";
  }, [fitnessMinutes]);

  const waterStatus = useMemo(() => {
    if (waterGlasses < 4) {
      return "Keep going. Try another glass over the next hour.";
    }

    if (waterGlasses < 7) {
      return "Good progress. You are building a healthier hydration rhythm.";
    }

    return "Hydration is looking strong today. Keep sipping steadily.";
  }, [waterGlasses]);

  function toggleHabit(habit) {
    setCheckedHabits((current) =>
      current.includes(habit)
        ? current.filter((item) => item !== habit)
        : [...current, habit],
    );
  }

  return (
    <main className="self-page">
      <section className="self-shell">
        <div className="self-page-top">
          <Link to="/" className="chat-back">
            <ArrowLeft size={18} />
            Back to home
          </Link>

          <p className="eyebrow">Self maintenance</p>
          <h1>Track your daily care with movement, water, food, sleep, hygiene, and simple routines.</h1>
          <p className="self-page-lead">
            This page is a practical self-maintenance guide. It combines quick
            trackers with realistic tips so daily care feels visible, manageable,
            and easier to return to.
          </p>
        </div>

        <section className="self-grid">
          <article className="self-card tracker-card">
            <div className="self-card-top">
              <span className="panel-icon">
                <Brain size={18} />
              </span>
              <div>
                <p className="eyebrow">Mood tracker</p>
                <h2>How are you feeling right now?</h2>
              </div>
            </div>

            <div className="self-checklist">
              {emotions.map((emotion) => (
                <button
                  key={emotion}
                  type="button"
                  className={
                    selectedMood === emotion
                      ? "habit-chip is-checked"
                      : "habit-chip"
                  }
                  onClick={() => setSelectedMood(emotion)}
                >
                  <CheckCircle2 size={16} />
                  {emotion}
                </button>
              ))}
            </div>

            <p className="tracker-status">
              Current mood: <strong>{selectedMood}</strong>
            </p>
          </article>

          <article className="self-card tracker-card">
            <div className="self-card-top">
              <span className="panel-icon">
                <Dumbbell size={18} />
              </span>
              <div>
                <p className="eyebrow">Fitness tracker</p>
                <h2>How many active minutes did you do today?</h2>
              </div>
            </div>

            <div className="tracker-number-row">
              <strong>{fitnessMinutes} min</strong>
              <span>Goal: move in a way your body can keep repeating</span>
            </div>

            <input
              className="tracker-slider"
              type="range"
              min="0"
              max="90"
              step="5"
              value={fitnessMinutes}
              onChange={(event) => setFitnessMinutes(Number(event.target.value))}
            />

            <p className="tracker-status">{fitnessStatus}</p>
          </article>

          <article className="self-card tracker-card">
            <div className="self-card-top">
              <span className="panel-icon">
                <GlassWater size={18} />
              </span>
              <div>
                <p className="eyebrow">Water tracker</p>
                <h2>How many glasses of water have you had today?</h2>
              </div>
            </div>

            <div className="tracker-counter">
              <button
                type="button"
                className="counter-button"
                onClick={() => setWaterGlasses((count) => Math.max(0, count - 1))}
              >
                -
              </button>
              <strong>{waterGlasses}</strong>
              <button
                type="button"
                className="counter-button"
                onClick={() => setWaterGlasses((count) => Math.min(12, count + 1))}
              >
                +
              </button>
            </div>

            <p className="tracker-status">{waterStatus}</p>

            <div className="water-dots" aria-label={`${waterGlasses} glasses of water`}>
              {Array.from({ length: 8 }).map((_, index) => (
                <span
                  key={index}
                  className={index < waterGlasses ? "water-dot is-filled" : "water-dot"}
                />
              ))}
            </div>
          </article>
        </section>

        <section className="resource-section">
          <div className="section-heading">
            <p className="eyebrow">
              <CheckCircle2 size={16} />
              Daily checklist
            </p>
            <h2>Tick off the basics that help self-maintenance feel real.</h2>
          </div>

          <div className="self-card self-checklist-card">
            <div className="self-checklist">
              {habitChecklist.map((habit) => {
                const isChecked = checkedHabits.includes(habit);

                return (
                  <button
                    key={habit}
                    type="button"
                    className={isChecked ? "habit-chip is-checked" : "habit-chip"}
                    onClick={() => toggleHabit(habit)}
                  >
                    <CheckCircle2 size={16} />
                    {habit}
                  </button>
                );
              })}
            </div>

            <p className="tracker-status">
              {checkedHabits.length === 0
                ? "Pick one small thing to complete first."
                : `${checkedHabits.length} healthy habit${checkedHabits.length === 1 ? "" : "s"} checked today.`}
            </p>
          </div>
        </section>

        <section className="resource-section">
          <div className="section-heading">
            <p className="eyebrow">
              <Salad size={16} />
              Balanced diet
            </p>
            <h2>Types of food a person can eat as part of a balanced diet.</h2>
          </div>

          <div className="self-tip-grid">
            {balancedDietTips.map((tip) => (
              <article key={tip.title} className="self-card self-tip-card">
                <span className="community-preview-tag">Balanced meals</span>
                <h3>{tip.title}</h3>
                <p>
                  <strong>Examples:</strong> {tip.foods}
                </p>
                <p>{tip.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="resource-section">
          <div className="section-heading">
            <p className="eyebrow">
              <Droplets size={16} />
              Hydration tips
            </p>
            <h2>Simple ways to make water intake easier to keep up.</h2>
          </div>

          <div className="self-tip-grid">
            {hydrationTips.map((tip) => (
              <article key={tip} className="self-card self-tip-card">
                <span className="community-preview-tag">Hydration</span>
                <p>{tip}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="resource-section">
          <div className="section-heading">
            <p className="eyebrow">
              <MoonStar size={16} />
              Sleep support
            </p>
            <h2>Follow a simple sleep routine with a clearer timeline.</h2>
          </div>

          <div className="self-tip-grid">
            {sleepTimeline.map((item) => (
              <article key={item.time} className="self-card self-tip-card">
                <span className="community-preview-tag">{item.time}</span>
                <h3>{item.title}</h3>
                <p>{item.tip}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="resource-section">
          <div className="section-heading">
            <p className="eyebrow">
              <ShieldPlus size={16} />
              Hygiene practice
            </p>
            <h2>Keep daily hygiene simple, consistent, and easy to remember.</h2>
          </div>

          <div className="self-card self-list-card">
            <div className="community-list">
              {hygienePractices.map((tip) => (
                <div key={tip} className="community-list-item">
                  <CheckCircle2 size={18} />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="resource-section">
          <div className="section-heading">
            <p className="eyebrow">
              <Sparkles size={16} />
              Exercise routines
            </p>
            <h2>Choose a routine that fits your energy instead of forcing one pace every day.</h2>
          </div>

          <div className="self-tip-grid">
            {exerciseRoutines.map((routine) => (
              <article key={routine.title} className="self-card self-tip-card">
                <span className="community-preview-tag">{routine.duration}</span>
                <h3>{routine.title}</h3>
                <p>{routine.description}</p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
