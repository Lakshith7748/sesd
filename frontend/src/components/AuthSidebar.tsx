import React from "react";

interface AuthSidebarProps {
  type: "login" | "register";
}

const content = {
  login: {
    tagline: (
      <>
        Find talent.
        <br />
        <span>Win projects.</span>
        <br />
        Build together.
      </>
    ),
    sub: "The modern marketplace connecting clients who have ideas with freelancers who have the skills to bring them to life.",
    features: [
      {
        icon: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
        title: "Instant onboarding",
        sub: "Be live in minutes with role-based flows",
      },
      {
        icon: (
          <>
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
          </>
        ),
        title: "Transparent bidding",
        sub: "Real-time bids with clear project status",
      },
      {
        icon: (
          <>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 12 11 14 15 10" />
          </>
        ),
        title: "Enterprise-grade security",
        sub: "JWT auth, role-based access, production-ready",
      },
    ],
    quote:
      '"FreelanceMarket cut our hiring time in half. The bidding system is transparent and the talent pool is exceptional."',
    author: "— Sarah K., Product Lead at Nexify",
  },
  register: {
    tagline: (
      <>
        Start your
        <br />
        <span>journey</span>
        <br />
        today.
      </>
    ),
    sub: "Join 50,000+ freelancers and clients already building the future of work on FreelanceMarket.",
    features: [
      {
        icon: (
          <>
            <path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" y1="8" x2="19" y2="14" />
            <line x1="22" y1="11" x2="16" y2="11" />
          </>
        ),
        title: "Free to join",
        sub: "No credit card required — start immediately",
      },
      {
        icon: (
          <>
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          </>
        ),
        title: "Post or bid on projects",
        sub: "Clients post, freelancers bid — simple workflow",
      },
      {
        icon: (
          <>
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </>
        ),
        title: "Track everything live",
        sub: "Real-time dashboards for bids, projects & payouts",
      },
    ],
    quote:
      '"I landed my first client within 24 hours of signing up. The platform just works."',
    author: "— James R., Full-Stack Developer",
  },
};

export default function AuthSidebar({ type }: AuthSidebarProps) {
  const data = content[type];

  return (
    <div className="auth-left">
      <div className="auth-left-brand">
        <div className="auth-left-brand-icon">FM</div>
        FreelanceMarket
      </div>

      <div className="auth-left-tagline">{data.tagline}</div>

      <p className="auth-left-sub">{data.sub}</p>

      <div className="auth-left-features">
        {data.features.map((feature, i) => (
          <div key={i} className="auth-left-feature">
            <div className="auth-left-feature-dot">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {feature.icon}
              </svg>
            </div>
            <div className="auth-left-feature-text">
              <strong>{feature.title}</strong>
              <span>{feature.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="auth-left-quote">
        <p>{data.quote}</p>
        <div className="auth-left-quote-author">{data.author}</div>
      </div>
    </div>
  );
}
