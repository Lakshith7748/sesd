import bcrypt from 'bcryptjs';
import { IUser } from '../models/User';
import { RegisterDTO, UserRole } from '../types';
import { AppError } from '../utils/AppError';

export class UserFactory {
  static async create(dto: RegisterDTO): Promise<Partial<IUser>> {
    const { name, email, password, role, skills } = dto;

    if (!name || !email || !password || !role) {
      throw new AppError('name, email, password and role are required', 400);
    }

    if (!Object.values(UserRole).includes(role)) {
      throw new AppError(`Invalid role: ${role}`, 400);
    }

    if (role === UserRole.FREELANCER && !skills) {
      throw new AppError('Freelancers must provide skills', 400);
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const base: Partial<IUser> = { name, email, passwordHash, role, isBlocked: false };

    if (role === UserRole.FREELANCER) {
      return { ...base, skills };
    }

    return base;
  }
}
