import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { IconArrowRight } from "../../components/Icons";
import { activity } from "./data";

export default function HeroSection() {
  const videoUrl = useMemo(() => {
    const fromEnv = (import.meta as any)?.env?.VITE_HOME_VIDEO_URL as
      | string
      | undefined;
    return (
      fromEnv ??
      "https://cdn.coverr.co/videos/coverr-teamwork-at-the-office-9715/1080p.mp4"
    );
  }, []);

  return (
    <section className="hp-hero">
      {/* Background Video directly injected into Hero for context, or kept as fixed bg?
          In the original it's fixed behind everything, so let's keep it here but absolute. */}
      <div className="hp-video-bg" aria-hidden="true">
        <video
          className="hp-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          src={videoUrl}
        />
        <div className="hp-video-overlay" />
      </div>

      <div className="hp-hero-inner">
        <div className="hp-hero-content">
          <div className="hp-chip">
            <span className="hp-chip-dot" />
            Premium Freelance Marketplace
          </div>

          <h1 className="hp-title">
            Exceptional work,
            <br />
            delivered <span className="hp-title-accent">at scale</span>.
          </h1>

          <p className="hp-subtitle">
            Match with high-signal talent, run transparent bidding, and ship
            faster — with a clean, modern workflow built for teams that demand
            excellence.
          </p>

          <div className="hp-hero-cta">
            <Link className="btn btn-primary btn-lg hp-cta-btn" to="/register">
              Start for Free
              <IconArrowRight size={18} className="hp-cta-arrow" />
            </Link>
            <Link className="btn btn-ghost btn-lg" to="/login">
              Sign in
            </Link>
          </div>

          <p className="hp-hero-note">
            No credit card required · Free forever for small teams
          </p>
        </div>

        <aside className="hp-hero-card">
          <div className="hp-glass-card">
            <div className="hp-glass-header">
              <div className="hp-glass-dot hp-dot-red" />
              <div className="hp-glass-dot hp-dot-yellow" />
              <div className="hp-glass-dot hp-dot-green" />
              <span className="hp-glass-label">Live Activity</span>
            </div>

            <ul className="hp-activity-list">
              {activity.map(({ Icon, title, sub, time }) => (
                <li key={title} className="hp-activity-item">
                  <span className="hp-activity-icon">
                    <Icon size={18} />
                  </span>
                  <div className="hp-activity-body">
                    <p className="hp-activity-title">{title}</p>
                    <p className="hp-activity-sub">{sub}</p>
                  </div>
                  <span className="hp-activity-time">{time}</span>
                </li>
              ))}
            </ul>

            <div className="hp-glass-footer">
              <Link className="btn btn-secondary btn-sm" to="/login">
                Explore demo
              </Link>
              <Link className="btn btn-primary  btn-sm" to="/register">
                Create account
              </Link>
            </div>
          </div>
        </aside>
      </div>

      <div className="hp-scroll-hint" aria-hidden="true">
        <div className="hp-scroll-mouse">
          <div className="hp-scroll-wheel" />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
