import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { IProjectRepository } from "../repositories/interfaces/IProjectRepository";
import { IDisputeRepository } from "../repositories/interfaces/IDisputeRepository";
import { IUser } from "../models/User";
import { IProject } from "../models/Project";
import { IDispute } from "../models/Dispute";
import { DisputeStatus } from "../types";
import { AppError } from "../utils/AppError";
import mongoose from "mongoose";

export class AdminService {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly projectRepo: IProjectRepository,
    private readonly disputeRepo: IDisputeRepository,
  ) {}

  async blockUser(userId: string): Promise<void> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new AppError("User not found", 404);
    await this.userRepo.setBlocked(userId, true);
  }

  async unblockUser(userId: string): Promise<void> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new AppError("User not found", 404);
    await this.userRepo.setBlocked(userId, false);
  }

  async getAllUsers(): Promise<IUser[]> {
    return this.userRepo.findAll();
  }

  async getAllProjects(): Promise<IProject[]> {
    return this.projectRepo.findAll();
  }

  async openDispute(
    raisedBy: string,
    projectId: string,
    reason: string,
  ): Promise<IDispute> {
    const project = await this.projectRepo.findById(projectId);
    if (!project) throw new AppError("Project not found", 404);

    const existing = await this.disputeRepo.findByProject(projectId);
    if (existing)
      throw new AppError("A dispute already exists for this project", 409);

    return this.disputeRepo.save({
      projectId: new mongoose.Types.ObjectId(projectId),
      raisedBy: new mongoose.Types.ObjectId(raisedBy),
      reason,
      status: DisputeStatus.OPEN,
    });
  }

  async resolveDispute(
    disputeId: string,
    resolution: string,
  ): Promise<IDispute> {
    const dispute = await this.disputeRepo.findById(disputeId);
    if (!dispute) throw new AppError("Dispute not found", 404);

    const updated = await this.disputeRepo.update(disputeId, {
      status: DisputeStatus.RESOLVED,
      resolution,
    });
    return updated!;
  }

  async getAllDisputes(): Promise<IDispute[]> {
    return this.disputeRepo.findAll();
  }
}
