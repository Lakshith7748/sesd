import UserModel, { IUser } from '../../models/User';
import { IUserRepository } from '../interfaces/IUserRepository';

export class MongoUserRepository implements IUserRepository {
  async findById(id: string): Promise<IUser | null> {
    return UserModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email }).exec();
  }

  async save(data: Partial<IUser>): Promise<IUser> {
    const user = new UserModel(data);
    return user.save();
  }

  async setBlocked(id: string, flag: boolean): Promise<void> {
    await UserModel.findByIdAndUpdate(id, { isBlocked: flag }).exec();
  }

  async findAll(): Promise<IUser[]> {
    return UserModel.find().select('-passwordHash').exec();
  }
}
