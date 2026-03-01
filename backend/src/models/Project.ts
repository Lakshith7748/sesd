import mongoose, { Document, Schema, Types } from 'mongoose';
import { ProjectStatus } from '../types';
import { AppError } from '../utils/AppError';

const ALLOWED_TRANSITIONS: Record<ProjectStatus, ProjectStatus[]> = {
  [ProjectStatus.OPEN]: [ProjectStatus.ASSIGNED],
  [ProjectStatus.ASSIGNED]: [ProjectStatus.IN_PROGRESS],
  [ProjectStatus.IN_PROGRESS]: [ProjectStatus.COMPLETED],
  [ProjectStatus.COMPLETED]: [],
};

export interface IProject extends Document {
  title: string;
  description: string;
  budget: number;
  deadline: Date;
  status: ProjectStatus;
  clientId: Types.ObjectId;
  assignedFreelancerId?: Types.ObjectId;
  acceptedBidId?: Types.ObjectId;
  createdAt: Date;
  canEdit(): boolean;
  canDelete(): boolean;
  transitionTo(newStatus: ProjectStatus): void;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    budget: { type: Number, required: true, min: 0 },
    deadline: { type: Date, required: true },
    status: { type: String, enum: Object.values(ProjectStatus), default: ProjectStatus.OPEN },
    clientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    assignedFreelancerId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    acceptedBidId: { type: Schema.Types.ObjectId, ref: 'Bid', default: null },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } }
);

ProjectSchema.methods.canEdit = function (): boolean {
  return this.status === ProjectStatus.OPEN;
};

ProjectSchema.methods.canDelete = function (): boolean {
  return this.status === ProjectStatus.OPEN;
};

ProjectSchema.methods.transitionTo = function (newStatus: ProjectStatus): void {
  const allowed = ALLOWED_TRANSITIONS[this.status as ProjectStatus];
  if (!allowed.includes(newStatus)) {
    throw new AppError(`Cannot transition project from ${this.status} to ${newStatus}`, 400);
  }
  this.status = newStatus;
};

const ProjectModel = mongoose.model<IProject>('Project', ProjectSchema);
export default ProjectModel;
