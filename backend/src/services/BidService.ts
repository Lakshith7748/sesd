import mongoose from "mongoose";
import { IBidRepository } from "../repositories/interfaces/IBidRepository";
import { IProjectRepository } from "../repositories/interfaces/IProjectRepository";
import { IBidRankingStrategy } from "../strategies/BidRankingStrategy";
import { PlaceBidDTO, BidStatus, ProjectStatus } from "../types";
import { IBid } from "../models/Bid";
import { AppError } from "../utils/AppError";

export class BidService {
  constructor(
    private readonly bidRepo: IBidRepository,
    private readonly projectRepo: IProjectRepository,
    private readonly strategy: IBidRankingStrategy,
  ) {}

  async placeBid(
    freelancerId: string,
    projectId: string,
    dto: PlaceBidDTO,
  ): Promise<IBid> {
    const project = await this.projectRepo.findById(projectId);
    if (!project) throw new AppError("Project not found", 404);
    if (project.status !== ProjectStatus.OPEN)
      throw new AppError("Project is not accepting bids", 400);

    const existing = await this.bidRepo.findByFreelancerAndProject(
      freelancerId,
      projectId,
    );
    if (existing)
      throw new AppError("You have already placed a bid on this project", 409);

    return this.bidRepo.save({
      projectId: new mongoose.Types.ObjectId(projectId),
      freelancerId: new mongoose.Types.ObjectId(freelancerId),
      amount: dto.amount,
      proposal: dto.proposal,
      status: BidStatus.PENDING,
    });
  }

  async withdrawBid(freelancerId: string, bidId: string): Promise<void> {
    const bid = await this.bidRepo.findById(bidId);
    if (!bid) throw new AppError("Bid not found", 404);
    if (bid.freelancerId.toString() !== freelancerId)
      throw new AppError("Forbidden: not your bid", 403);

    bid.withdraw();
    await this.bidRepo.update(bidId, { status: BidStatus.WITHDRAWN });
  }

  async getBidsForProject(
    clientId: string,
    projectId: string,
  ): Promise<IBid[]> {
    const project = await this.projectRepo.findById(projectId);
    if (!project) throw new AppError("Project not found", 404);
    if (project.clientId.toString() !== clientId)
      throw new AppError("Forbidden: you do not own this project", 403);

    const bids = await this.bidRepo.findByProject(projectId);
    return this.strategy.rank(bids);
  }

  async getMyBids(freelancerId: string): Promise<IBid[]> {
    return this.bidRepo.findByFreelancer(freelancerId);
  }
}
