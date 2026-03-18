import React from 'react';
import { ProjectStatus, BidStatus, DisputeStatus, UserRole } from '../types';

type AnyStatus = ProjectStatus | BidStatus | DisputeStatus | UserRole | 'blocked' | 'active';

const MAP: Record<string, string> = {
  OPEN: 'badge-open',
  ASSIGNED: 'badge-assigned',
  IN_PROGRESS: 'badge-progress',
  COMPLETED: 'badge-completed',
  PENDING: 'badge-pending',
  ACCEPTED: 'badge-accepted',
  REJECTED: 'badge-rejected',
  WITHDRAWN: 'badge-withdrawn',
  CLIENT: 'badge-client',
  FREELANCER: 'badge-freelancer',
  ADMIN: 'badge-admin',
  blocked: 'badge-blocked',
  active: 'badge-open',
  UNDER_REVIEW: 'badge-assigned',
  RESOLVED: 'badge-completed',
};

const LABEL: Record<string, string> = {
  IN_PROGRESS: 'In Progress',
  UNDER_REVIEW: 'Under Review',
};

export default function StatusBadge({ status }: { status: AnyStatus }) {
  const cls = MAP[status] ?? 'badge-pending';
  const label = LABEL[status] ?? status.replace(/_/g, ' ');
  return <span className={`badge ${cls}`}>{label}</span>;
}
