import mongoose, { Document, Schema, Types } from 'mongoose';
import { BidStatus } from '../types';
import { AppError } from '../utils/AppError';

export interface IBid extends Document {
  projectId: Types.ObjectId;
  freelancerId: Types.ObjectId;
  amount: number;
  proposal: string;
  status: BidStatus;
  createdAt: Date;
  withdraw(): void;
}

const BidSchema = new Schema<IBid>(
  {
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    freelancerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true, min: 0 },
    proposal: { type: String, required: true },
    status: { type: String, enum: Object.values(BidStatus), default: BidStatus.PENDING },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } }
);

BidSchema.methods.withdraw = function (): void {
  if (this.status !== BidStatus.PENDING) {
    throw new AppError('Only PENDING bids can be withdrawn', 400);
  }
  this.status = BidStatus.WITHDRAWN;
};

const BidModel = mongoose.model<IBid>('Bid', BidSchema);
export default BidModel;
