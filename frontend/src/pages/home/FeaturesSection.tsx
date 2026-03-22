import React from 'react';
import { features } from './data';

export default function FeaturesSection() {
  return (
    <section id="features" className="hp-features">
      <div className="hp-section-inner">
        <div className="hp-section-header">
          <div className="hp-chip hp-chip-center">Everything you need</div>
          <h2 className="hp-section-title">
            Built for modern
            <br />
            <span className="hp-title-accent">freelance teams</span>
          </h2>
          <p className="hp-section-sub">
            From posting your first project to managing a team of 100+ freelancers,
            FreelanceMarket scales with your ambition.
          </p>
        </div>

        <div className="hp-features-grid">
          {features.map((f) => (
            <div
              key={f.title}
              className="hp-feature-card"
              style={{ '--feature-color': f.color } as React.CSSProperties}
            >
              <div className="hp-feature-icon" style={{ color: f.color }}>
                {f.icon}
              </div>
              <h3 className="hp-feature-title">{f.title}</h3>
              <p className="hp-feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
