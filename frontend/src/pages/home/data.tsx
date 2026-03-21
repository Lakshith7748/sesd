import React from 'react';
import {
  IconTarget,
  IconCheckCircle,
  IconUserPlus,
  IconZap,
  IconShieldCheck,
  IconBarChart,
  IconRocket,
  IconDollarSign,
  IconGlobe,
  IconBriefcase,
  IconActivity,
} from '../../components/Icons';

export const features = [
  {
    icon: <IconZap size={22} />,
    title: 'Lightning-Fast Onboarding',
    desc: 'Role-based flows for clients and freelancers. Up and running in minutes, not days.',
    color: 'var(--clr-accent)',
  },
  {
    icon: <IconTarget size={22} />,
    title: 'Transparent Bidding',
    desc: 'Real-time bid management with clear project status, competitive pricing, and smart ranking.',
    color: 'var(--clr-accent-2)',
  },
  {
    icon: <IconShieldCheck size={22} />,
    title: 'Enterprise-Grade Security',
    desc: 'JWT authentication with MongoDB, role-based access control, and production-ready hardening.',
    color: 'var(--clr-fuchsia)',
  },
  {
    icon: <IconBarChart size={22} />,
    title: 'Real-Time Analytics',
    desc: 'Dashboards for every role. Track project health, bid activity, and team performance live.',
    color: 'var(--clr-success)',
  },
  {
    icon: <IconGlobe size={22} />,
    title: 'Smart Matching',
    desc: 'Connect high-signal talent with the right projects through intelligent bid categorisation.',
    color: 'var(--clr-warning)',
  },
  {
    icon: <IconRocket size={22} />,
    title: 'Ship Faster',
    desc: 'Streamlined workflow management so your team can focus on delivering great work.',
    color: '#c084fc',
  },
];

export const stats = [
  { value: '10K+', label: 'Active Projects', Icon: IconBriefcase },
  { value: '50K+', label: 'Freelancers', Icon: IconGlobe },
  { value: '99.9%', label: 'Uptime SLA', Icon: IconActivity },
  { value: '$2M+', label: 'Paid Out', Icon: IconDollarSign },
];

export const activity = [
  {
    Icon: IconBriefcase,
    title: 'New project posted',
    sub: 'React Dashboard · $2,400 budget',
    time: '2m ago',
  },
  {
    Icon: IconTarget,
    title: 'Bid accepted',
    sub: 'API Integration · $850',
    time: '5m ago',
  },
  {
    Icon: IconCheckCircle,
    title: 'Project completed',
    sub: 'Mobile App · rated 5 / 5',
    time: '12m ago',
  },
  {
    Icon: IconUserPlus,
    title: 'New freelancer joined',
    sub: 'Full-Stack Developer · Top Rated',
    time: '18m ago',
  },
];
