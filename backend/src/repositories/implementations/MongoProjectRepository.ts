import { ClientSession } from 'mongoose';
import ProjectModel, { IProject } from '../../models/Project';
import { IProjectRepository } from '../interfaces/IProjectRepository';
import { ProjectStatus } from '../../types';

export class MongoProjectRepository implements IProjectRepository {
  async findById(id: string, session?: ClientSession): Promise<IProject | null> {
    return ProjectModel.findById(id)
      .session(session ?? null)
      .exec();
  }

  async findAllOpen(): Promise<IProject[]> {
    return ProjectModel.find({ status: ProjectStatus.OPEN })
      .populate('clientId', 'name email')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findByClient(clientId: string): Promise<IProject[]> {
    return ProjectModel.find({ clientId }).sort({ createdAt: -1 }).exec();
  }

  async save(data: Partial<IProject>): Promise<IProject> {
    const project = new ProjectModel(data);
    return project.save();
  }

  async update(
    id: string,
    data: Partial<IProject>,
    session?: ClientSession
  ): Promise<IProject | null> {
    return ProjectModel.findByIdAndUpdate(id, data, { new: true, session: session ?? null }).exec();
  }

  async delete(id: string): Promise<void> {
    await ProjectModel.findByIdAndDelete(id).exec();
  }

  async findAll(): Promise<IProject[]> {
    return ProjectModel.find()
      .populate('clientId', 'name email')
      .populate('assignedFreelancerId', 'name email')
      .sort({ createdAt: -1 })
      .exec();
  }
}
