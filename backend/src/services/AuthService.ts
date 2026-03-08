import jwt from 'jsonwebtoken';
import { IUserRepository } from '../repositories/interfaces/IUserRepository';
import { UserFactory } from '../factories/UserFactory';
import { RegisterDTO, LoginDTO, UserRole } from '../types';
import { IUser } from '../models/User';
import { AppError } from '../utils/AppError';

export class AuthService {
  constructor(private readonly userRepo: IUserRepository) {}

  async register(dto: RegisterDTO): Promise<IUser> {
    const existing = await this.userRepo.findByEmail(dto.email);
    if (existing) {
      throw new AppError('Email already in use', 409);
    }

    const userData = await UserFactory.create(dto);
    const user = await this.userRepo.save(userData);
    return user;
  }

  async login(dto: LoginDTO): Promise<string> {
    const user = await this.userRepo.findByEmail(dto.email);
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    if (user.isBlocked) {
      throw new AppError('Your account has been blocked by an administrator', 403);
    }

    const valid = await user.comparePassword(dto.password);
    if (!valid) {
      throw new AppError('Invalid email or password', 401);
    }

    const secret = process.env.JWT_SECRET as string;
    const token = jwt.sign({ userId: user._id.toString(), role: user.role as UserRole }, secret, {
      expiresIn: '7d',
    });

    return token;
  }
}
