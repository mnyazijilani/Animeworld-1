import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowLeft,
  CheckCircle2,
  Droplet,
  HeartHandshake,
  ShieldPlus,
  Sparkles,
  TimerReset,
} from "lucide-react";

const bloodDonationFacts = [
  "Donate only when you meet the local eligibility guidance and feel well on the day.",
  "Eat a balanced meal and drink enough water before and after donating blood.",
  "Rest after donation and tell a health professional immediately if you feel faint or unwell.",
];

const fitnessChallenges = [
  {
    title: "7-day step challenge",
    tag: "Movement",
    text: "Walk a little more each day and track how many active minutes or steps you can build consistently.",
  },
  {
    title: "Class stretch break",
    tag: "Mobility",
    text: "Pause for short stretching sessions between lessons, study blocks, or club activities.",
  },
  {
    title: "Weekend team workout",
    tag: "Community",
    text: "Try football drills, skipping, brisk walking, dancing, or bodyweight circuits with friends.",
  },
];

const weeklyWellnessChallenges = [
  "Drink water before every class break or study session.",
  "Sleep on time for five nights in one week.",
  "Add one fruit or vegetable to at least one meal each day.",
  "Take a 10-minute walk or stretch break every day this week.",
];

const schoolCampaigns = [
  {
    title: "Blood donation awareness week",
    text: "Invite health professionals to speak about safe donation, myths, and the value of helping others.",
  },
  {
    title: "Clean water and hygiene campaign",
    text: "Use student posters, assemblies, and demos to promote handwashing, clean bottles, and hydration.",
  },
  {
    title: "Active school month",
    text: "Run step challenges, sports mini-events, and daily stretch breaks that include every class level.",
  },
];

const healthQuizQuestions = [
  {
    question: "Which habit helps prevent dehydration?",
    options: [
      "Drinking water regularly through the day",
      "Waiting until you feel very thirsty every time",
      "Skipping water when busy",
    ],
    answer: 0,
  },
  {
    question: "Which meal is closer to a balanced plate?",
    options: [
      "Only chips and soda",
      "Rice, beans, vegetables, and fruit",
      "Sweets and energy drinks",
    ],
    answer: 1,
  },
  {
    question: "Why is sleep important for students?",
    options: [
      "It helps rest the body and support focus",
      "It only matters on weekends",
      "It can be replaced fully by caffeine",
    ],
    answer: 0,
  },
];

export default function QuizPage() {
  const [answers, setAnswers] = useState({});

  const score = useMemo(
    () =>
      healthQuizQuestions.reduce((total, item, index) => {
        return total + (answers[index] === item.answer ? 1 : 0);
      }, 0),
    [answers],
  );

  const completedCount = Object.keys(answers).length;

  return (
    <main className="quiz-page">
      <section className="quiz-shell">
        <div className="quiz-page-top">
          <Link to="/" className="chat-back">
            <ArrowLeft size={18} />
            Back to home
          </Link>

          <p className="eyebrow">Quiz and challenges</p>
          <h1>Health quizzes, blood donation awareness, fitness challenges, and school wellness campaigns.</h1>
          <p className="quiz-page-lead">
            This page brings together interactive health learning with
            practical school-based challenges. It is designed to make wellness
            feel active, social, and easier to practice every week.
          </p>
        </div>

        <section className="quiz-grid">
          <article className="quiz-card quiz-feature-card">
            <div className="self-card-top">
              <span className="panel-icon">
                <HeartHandshake size={18} />
              </span>
              <div>
                <p className="eyebrow">Blood donation</p>
                <h2>Awareness ideas students can learn from and share.</h2>
              </div>
            </div>

            <div className="community-list">
              {bloodDonationFacts.map((item) => (
                <div key={item} className="community-list-item">
                  <CheckCircle2 size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="quiz-card quiz-feature-card">
            <div className="self-card-top">
              <span className="panel-icon">
                <Activity size={18} />
              </span>
              <div>
                <p className="eyebrow">Weekly snapshot</p>
                <h2>Keep the energy up with school-friendly wellness goals.</h2>
              </div>
            </div>

            <div className="community-list">
              {weeklyWellnessChallenges.map((item) => (
                <div key={item} className="community-list-item">
                  <CheckCircle2 size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="resource-section">
          <div className="section-heading">
            <p className="eyebrow">
              <ShieldPlus size={16} />
              Health quiz
            </p>
            <h2>Answer a few quick questions and check your wellness knowledge.</h2>
          </div>

          <div className="quiz-questions">
            {healthQuizQuestions.map((item, questionIndex) => (
              <article key={item.question} className="quiz-card quiz-question-card">
                <div className="quiz-question-top">
                  <span className="community-preview-tag">
                    Question {questionIndex + 1}
                  </span>
                  <h3>{item.question}</h3>
                </div>

                <div className="quiz-options">
                  {item.options.map((option, optionIndex) => {
                    const isSelected = answers[questionIndex] === optionIndex;

                    return (
                      <button
                        key={option}
                        type="button"
                        className={
                          isSelected ? "quiz-option is-selected" : "quiz-option"
                        }
                        onClick={() =>
                          setAnswers((current) => ({
                            ...current,
                            [questionIndex]: optionIndex,
                          }))
                        }
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>

          <div className="quiz-card quiz-score-card">
            <div className="tracker-number-row">
              <strong>
                {score}/{healthQuizQuestions.length}
              </strong>
              <span>
                {completedCount < healthQuizQuestions.length
                  ? `You have answered ${completedCount} of ${healthQuizQuestions.length} questions.`
                  : "Quiz complete. Review the questions and keep practicing the healthy habits behind them."}
              </span>
            </div>
          </div>
        </section>

        <section className="resource-section">
          <div className="section-heading">
            <p className="eyebrow">
              <TimerReset size={16} />
              Fitness challenges
            </p>
            <h2>Short challenges that make movement feel social and achievable.</h2>
          </div>

          <div className="quiz-challenge-grid">
            {fitnessChallenges.map((item) => (
              <article key={item.title} className="quiz-card quiz-challenge-card">
                <span className="community-preview-tag">{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="resource-section">
          <div className="section-heading">
            <p className="eyebrow">
              <Sparkles size={16} />
              School health campaigns
            </p>
            <h2>Campaign ideas schools can run to turn health learning into action.</h2>
          </div>

          <div className="quiz-challenge-grid">
            {schoolCampaigns.map((item) => (
              <article key={item.title} className="quiz-card quiz-challenge-card">
                <span className="community-preview-tag">Campaign</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="resource-section">
          <div className="section-heading">
            <p className="eyebrow">
              <Droplet size={16} />
              Weekly wellness challenges
            </p>
            <h2>Small habits that can be repeated by students, clubs, or whole classes.</h2>
          </div>

          <div className="quiz-card quiz-feature-card">
            <div className="community-list">
              {weeklyWellnessChallenges.map((item) => (
                <div key={item} className="community-list-item">
                  <CheckCircle2 size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
