import React from 'react';
import { Link } from 'react-router-dom';
import { IconArrowRight } from '../../components/Icons';

export default function FinalCTA() {
  return (
    <section className="hp-final-cta">
      <div className="hp-final-cta-inner">
        <div className="hp-final-cta-glow" aria-hidden="true" />
        <h2 className="hp-final-title">
          Ready to hire smarter
          <br />
          and deliver faster?
        </h2>
        <p className="hp-final-sub">
          Join thousands of teams already using FreelanceMarket to build great products.
        </p>
        <div className="hp-final-actions">
          <Link className="btn btn-primary btn-lg hp-cta-btn" to="/register">
            Get started free
            <IconArrowRight size={18} className="hp-cta-arrow" />
          </Link>
          <Link className="btn btn-ghost btn-lg" to="/login">
            Sign in
          </Link>
        </div>
      </div>
    </section>
  );
}
