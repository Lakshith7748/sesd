import React from "react";
import { Link } from "react-router-dom";
import HeroSection from "./home/HeroSection";
import StatsBar from "./home/StatsBar";
import FeaturesSection from "./home/FeaturesSection";
import FinalCTA from "./home/FinalCTA";

export default function HomePage() {
  return (
    <div className="home-page">
      <header className="hp-nav">
        <div className="hp-nav-inner">
          <Link to="/" className="hp-brand">
            <span className="hp-brand-icon">FM</span>
            <span className="hp-brand-text">FreelanceMarket</span>
          </Link>
          <nav className="hp-nav-links">
            <a href="#features" className="hp-nav-link">
              Features
            </a>
            <a href="#stats" className="hp-nav-link">
              Stats
            </a>
            <Link to="/login" className="hp-nav-link">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm">
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      <HeroSection />
      <StatsBar />
      <FeaturesSection />
      <FinalCTA />

      <footer className="hp-footer">
        <div className="hp-footer-inner">
          <Link to="/" className="hp-brand">
            <span className="hp-brand-icon hp-brand-icon-sm">FM</span>
            <span className="hp-brand-text">FreelanceMarket</span>
          </Link>
          <p className="hp-footer-copy">
            © 2026 FreelanceMarket. Built for the future of work.
          </p>
          <div className="hp-footer-links">
            <Link to="/login" className="hp-footer-link">
              Login
            </Link>
            <Link to="/register" className="hp-footer-link">
              Register
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
