export enum UserRole {
  CLIENT = 'CLIENT',
  FREELANCER = 'FREELANCER',
  ADMIN = 'ADMIN',
}

export enum ProjectStatus {
  OPEN = 'OPEN',
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export enum BidStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  WITHDRAWN = 'WITHDRAWN',
}

export enum DisputeStatus {
  OPEN = 'OPEN',
  UNDER_REVIEW = 'UNDER_REVIEW',
  RESOLVED = 'RESOLVED',
}

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  skills?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface CreateProjectDTO {
  title: string;
  description: string;
  budget: number;
  deadline: Date;
}

export interface PlaceBidDTO {
  amount: number;
  proposal: string;
}

export interface CreateDisputeDTO {
  projectId: string;
  reason: string;
}

export interface JwtPayload {
  userId: string;
  role: UserRole;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
