export type UserRole = "CLIENT" | "FREELANCER" | "ADMIN";
export type ProjectStatus = "OPEN" | "ASSIGNED" | "IN_PROGRESS" | "COMPLETED";
export type BidStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "WITHDRAWN";
export type DisputeStatus = "OPEN" | "UNDER_REVIEW" | "RESOLVED";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  isBlocked: boolean;
  skills?: string;
  createdAt: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  status: ProjectStatus;
  clientId: User | string;
  assignedFreelancerId?: User | string | null;
  acceptedBidId?: string | null;
  createdAt: string;
}

export interface Bid {
  _id: string;
  projectId: Project | string;
  freelancerId: User | string;
  amount: number;
  proposal: string;
  status: BidStatus;
  createdAt: string;
}

export interface Dispute {
  _id: string;
  projectId: Project | string;
  raisedBy: User | string;
  reason: string;
  status: DisputeStatus;
  resolution?: string;
  createdAt: string;
}

export interface AuthState {
  token: string | null;
  user: { userId: string; role: UserRole; name?: string } | null;
}
