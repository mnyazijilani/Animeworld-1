import "./App.css";

import { HashRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import { Heart } from "lucide-react";
import Signin from "./components/Signin";
import Signout from "./components/Signout";
import Signup from "./components/Signup";
import Getproduct from "./components/Getproduct";
import AnonymousChat from "./components/AnonymousChat";
import Journal from "./components/Journal";
import SupportPage from "./components/SupportPage";
import RitualsPage from "./components/RitualsPage";
import FaqPage from "./components/FaqPage";
import HelpChatbot from "./components/HelpChatbot";

function Navbar() {
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
        <Link to="/support">Support</Link>
        <Link to="/rituals">Rituals</Link>
        <Link to="/journal">Journal</Link>
        <Link to="/community">Community</Link>
        <Link to="/faq">FAQ</Link>
      </div>

      <div className="navbar-actions">
        <Link className="nav-secondary" to="/signin">
          Sign in
        </Link>
        <Link className="nav-primary" to="/signup">
          Get started
        </Link>
      </div>
    </nav>
  );
}

function AppShell() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="App page-shell">
      <div className="page-overlay">
        {isHome ? (
          <header className="site-header">
            <Navbar />
          </header>
        ) : null}

        <Routes>
          <Route path="/" element={<Getproduct />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signout" element={<Signout />} />
          <Route path="/community" element={<AnonymousChat />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/rituals" element={<RitualsPage />} />
          <Route path="/faq" element={<FaqPage />} />
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
