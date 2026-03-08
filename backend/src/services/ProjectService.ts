import mongoose from 'mongoose';
import { IProjectRepository } from '../repositories/interfaces/IProjectRepository';
import { IBidRepository } from '../repositories/interfaces/IBidRepository';
import { CreateProjectDTO } from '../types';
import { ProjectStatus, BidStatus } from '../types';
import { IProject } from '../models/Project';
import { AppError } from '../utils/AppError';

export class ProjectService {
  constructor(
    private readonly projectRepo: IProjectRepository,
    private readonly bidRepo: IBidRepository
  ) {}

  async createProject(clientId: string, dto: CreateProjectDTO): Promise<IProject> {
    return this.projectRepo.save({
      ...dto,
      clientId: new mongoose.Types.ObjectId(clientId),
      status: ProjectStatus.OPEN,
    });
  }

  async editProject(
    clientId: string,
    projectId: string,
    dto: Partial<CreateProjectDTO>
  ): Promise<IProject> {
    const project = await this.projectRepo.findById(projectId);
    if (!project) throw new AppError('Project not found', 404);
    if (project.clientId.toString() !== clientId)
      throw new AppError('You do not own this project', 403);
    if (!project.canEdit()) throw new AppError('Only OPEN projects can be edited', 400);

    const updated = await this.projectRepo.update(projectId, dto);
    return updated!;
  }

  async deleteProject(clientId: string, projectId: string): Promise<void> {
    const project = await this.projectRepo.findById(projectId);
    if (!project) throw new AppError('Project not found', 404);
    if (project.clientId.toString() !== clientId)
      throw new AppError('You do not own this project', 403);
    if (!project.canDelete()) throw new AppError('Only OPEN projects can be deleted', 400);

    await this.projectRepo.delete(projectId);
  }

  async getOpenProjects(): Promise<IProject[]> {
    return this.projectRepo.findAllOpen();
  }

  async getMyProjects(clientId: string): Promise<IProject[]> {
    return this.projectRepo.findByClient(clientId);
  }

  async acceptBid(clientId: string, projectId: string, bidId: string): Promise<IProject> {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const project = await this.projectRepo.findById(projectId, session);
      if (!project) throw new AppError('Project not found', 404);
      if (project.clientId.toString() !== clientId)
        throw new AppError('Forbidden: you do not own this project', 403);
      if (project.status !== ProjectStatus.OPEN)
        throw new AppError('Project is not accepting bids', 400);

      const bid = await this.bidRepo.findById(bidId);
      if (!bid) throw new AppError('Bid not found', 404);
      if (bid.projectId.toString() !== projectId)
        throw new AppError('Bid does not belong to this project', 400);

      project.transitionTo(ProjectStatus.ASSIGNED);

      const updatedProject = await this.projectRepo.update(
        projectId,
        {
          status: ProjectStatus.ASSIGNED,
          assignedFreelancerId: bid.freelancerId,
          acceptedBidId: bid._id as mongoose.Types.ObjectId,
        },
        session
      );

      await this.bidRepo.update(bidId, { status: BidStatus.ACCEPTED }, session);

      await session.commitTransaction();
      return updatedProject!;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      await session.endSession();
    }
  }

  async markCompleted(clientId: string, projectId: string): Promise<IProject> {
    const project = await this.projectRepo.findById(projectId);
    if (!project) throw new AppError('Project not found', 404);
    if (project.clientId.toString() !== clientId) throw new AppError('Forbidden', 403);

    if (project.status !== ProjectStatus.ASSIGNED && project.status !== ProjectStatus.IN_PROGRESS) {
      throw new AppError('Project must be ASSIGNED or IN_PROGRESS to complete', 400);
    }

    const updated = await this.projectRepo.update(projectId, {
      status: ProjectStatus.COMPLETED,
    });
    return updated!;
  }
}
