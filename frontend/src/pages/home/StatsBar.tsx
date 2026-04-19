import React from "react";
import { stats } from "./data";

export default function StatsBar() {
  return (
    <section id="stats" className="hp-stats-bar">
      <div className="hp-stats-inner">
        {stats.map(({ value, label, Icon }) => (
          <div key={label} className="hp-stat">
            <Icon
              size={20}
              color="var(--clr-accent)"
              strokeWidth={1.7}
              className="hp-stat-icon"
            />
            <span className="hp-stat-value">{value}</span>
            <span className="hp-stat-label">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
