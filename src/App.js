import "./App.css";

import { useEffect, useState } from "react";
import { HashRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import { Heart } from "lucide-react";
import Signin from "./components/Signin";
import Signout from "./components/Signout";
import Signup from "./components/Signup";
import Getproduct from "./components/Getproduct";
import AnonymousChat from "./components/AnonymousChat";
import Journal from "./components/Journal";
import SupportPage from "./components/SupportPage";
import ResourcesPage from "./components/ResourcesPage";
import RitualsPage from "./components/RitualsPage";
import FaqPage from "./components/FaqPage";
import ProjectsPage from "./components/ProjectsPage";
import SelfMaintenancePage from "./components/SelfMaintenancePage";
import QuizPage from "./components/QuizPage";
import TherapyAppointmentsPage from "./components/TherapyAppointmentsPage";
import HelpChatbot from "./components/HelpChatbot";
import { getCurrentSession } from "./utils/auth";

function Navbar({ session }) {
  return (
    <nav className="navbar">
      <Link className="navbar-brand" to="/">
        <span className="brand-mark">
          <Heart size={18} />
        </span>
        <span className="brand-copy">
          <strong>MindWell</strong>
          <span>Daily mental care</span>
        </span>
      </Link>

      <div className="navbar-links">
        <Link to="/projects">Projects</Link>
        <Link to="/self-maintenance">Self Care</Link>
        <Link to="/quiz">Quiz</Link>
        <Link to="/support">Support</Link>
        <Link to="/appointments">Appointments</Link>
        <Link to="/resources">Resources</Link>
        <Link to="/rituals">Rituals</Link>
        <Link to="/journal">Journal</Link>
        <Link to="/community">Community</Link>
        <Link to="/faq">FAQ</Link>
      </div>

      <div className="navbar-actions">
        {session ? (
          <>
            <Link className="nav-secondary" to="/signout">
              Sign out
            </Link>
            <Link className="nav-primary" to="/journal">
              {session.name ? `${session.name.split(" ")[0]}'s journal` : "My journal"}
            </Link>
          </>
        ) : (
          <>
            <Link className="nav-secondary" to="/signin">
              Sign in
            </Link>
            <Link className="nav-primary" to="/signup">
              Get started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

function AppShell() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [session, setSession] = useState(() => getCurrentSession());

  useEffect(() => {
    setSession(getCurrentSession());
  }, [location.pathname]);

  return (
    <div className="App page-shell">
      <div className="page-overlay">
        {isHome ? (
          <header className="site-header">
            <Navbar session={session} />
          </header>
        ) : null}

        <Routes>
          <Route path="/" element={<Getproduct />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin onSignin={setSession} />} />
          <Route path="/signout" element={<Signout onSignout={() => setSession(null)} />} />
          <Route path="/community" element={<AnonymousChat />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/appointments" element={<TherapyAppointmentsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/rituals" element={<RitualsPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/self-maintenance" element={<SelfMaintenancePage />} />
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>

        <HelpChatbot />
      </div>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <AppShell />
    </HashRouter>
  );
}

export default App;
