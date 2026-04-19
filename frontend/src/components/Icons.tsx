import React from "react";

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
}

const base = (
  size: number,
  color: string,
  sw: number,
  children: React.ReactNode,
  className = "",
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

export const IconBriefcase = ({
  size = 20,
  color = "currentColor",
  strokeWidth = 1.8,
  className,
}: IconProps) =>
  base(
    size,
    color,
    strokeWidth,
    <>
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <line x1="12" y1="12" x2="12" y2="12" />
    </>,
    className,
  );

export const IconTarget = ({
  size = 20,
  color = "currentColor",
  strokeWidth = 1.8,
  className,
}: IconProps) =>
  base(
    size,
    color,
    strokeWidth,
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </>,
    className,
  );

export const IconCheckCircle = ({
  size = 20,
  color = "currentColor",
  strokeWidth = 1.8,
  className,
}: IconProps) =>
  base(
    size,
    color,
    strokeWidth,
    <>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </>,
    className,
  );

export const IconUserPlus = ({
  size = 20,
  color = "currentColor",
  strokeWidth = 1.8,
  className,
}: IconProps) =>
  base(
    size,
    color,
    strokeWidth,
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" y1="8" x2="19" y2="14" />
      <line x1="22" y1="11" x2="16" y2="11" />
    </>,
    className,
  );

export const IconZap = ({
  size = 20,
  color = "currentColor",
  strokeWidth = 1.8,
  className,
}: IconProps) =>
  base(
    size,
    color,
    strokeWidth,
    <>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </>,
    className,
  );

export const IconShieldCheck = ({
  size = 20,
  color = "currentColor",
  strokeWidth = 1.8,
  className,
}: IconProps) =>
  base(
    size,
    color,
    strokeWidth,
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </>,
    className,
  );

export const IconBarChart = ({
  size = 20,
  color = "currentColor",
  strokeWidth = 1.8,
  className,
}: IconProps) =>
  base(
    size,
    color,
    strokeWidth,
    <>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </>,
    className,
  );

export const IconUsers = ({
  size = 20,
  color = "currentColor",
  strokeWidth = 1.8,
  className,
}: IconProps) =>
  base(
    size,
    color,
    strokeWidth,
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>,
    className,
  );

export const IconRocket = ({
  size = 20,
  color = "currentColor",
  strokeWidth = 1.8,
  className,
}: IconProps) =>
  base(
    size,
    color,
    strokeWidth,
    <>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </>,
    className,
  );

export const IconArrowRight = ({
  size = 18,
  color = "currentColor",
  strokeWidth = 2,
  className,
}: IconProps) =>
  base(
    size,
    color,
    strokeWidth,
    <>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </>,
    className,
  );

export const IconDollarSign = ({
  size = 20,
  color = "currentColor",
  strokeWidth = 1.8,
  className,
}: IconProps) =>
  base(
    size,
    color,
    strokeWidth,
    <>
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </>,
    className,
  );

export const IconGlobe = ({
  size = 20,
  color = "currentColor",
  strokeWidth = 1.8,
  className,
}: IconProps) =>
  base(
    size,
    color,
    strokeWidth,
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </>,
    className,
  );

export const IconServer = ({
  size = 20,
  color = "currentColor",
  strokeWidth = 1.8,
  className,
}: IconProps) =>
  base(
    size,
    color,
    strokeWidth,
    <>
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </>,
    className,
  );

export const IconActivity = ({
  size = 20,
  color = "currentColor",
  strokeWidth = 1.8,
  className,
}: IconProps) =>
  base(
    size,
    color,
    strokeWidth,
    <>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </>,
    className,
  );
