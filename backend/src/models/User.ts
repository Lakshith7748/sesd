import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserRole } from '../types';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  isBlocked: boolean;
  skills?: string;
  createdAt: Date;
  comparePassword(plain: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), required: true },
    isBlocked: { type: Boolean, default: false },
    skills: { type: String, default: '' }, // Freelancer only
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } }
);

UserSchema.methods.comparePassword = async function (plain: string): Promise<boolean> {
  return bcrypt.compare(plain, this.passwordHash);
};

const UserModel = mongoose.model<IUser>('User', UserSchema);
export default UserModel;
