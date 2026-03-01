import mongoose, { Document, Schema, Types } from 'mongoose';
import { DisputeStatus } from '../types';

export interface IDispute extends Document {
  projectId: Types.ObjectId;
  raisedBy: Types.ObjectId;
  reason: string;
  status: DisputeStatus;
  resolution?: string;
  createdAt: Date;
}

const DisputeSchema = new Schema<IDispute>(
  {
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    raisedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: Object.values(DisputeStatus), default: DisputeStatus.OPEN },
    resolution: { type: String, default: null },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } }
);

const DisputeModel = mongoose.model<IDispute>('Dispute', DisputeSchema);
export default DisputeModel;
