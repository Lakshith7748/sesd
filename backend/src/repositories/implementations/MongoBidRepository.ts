import { ClientSession } from "mongoose";
import BidModel, { IBid } from "../../models/Bid";
import { IBidRepository } from "../interfaces/IBidRepository";

export class MongoBidRepository implements IBidRepository {
  async findById(id: string): Promise<IBid | null> {
    return BidModel.findById(id).exec();
  }

  async findByProject(projectId: string): Promise<IBid[]> {
    return BidModel.find({ projectId })
      .populate("freelancerId", "name email skills")
      .sort({ createdAt: 1 })
      .exec();
  }

  async findByFreelancerAndProject(
    freelancerId: string,
    projectId: string,
  ): Promise<IBid | null> {
    return BidModel.findOne({ freelancerId, projectId }).exec();
  }

  async findByFreelancer(freelancerId: string): Promise<IBid[]> {
    return BidModel.find({ freelancerId })
      .populate("projectId", "title status budget deadline")
      .sort({ createdAt: -1 })
      .exec();
  }

  async save(data: Partial<IBid>): Promise<IBid> {
    const bid = new BidModel(data);
    return bid.save();
  }

  async update(
    id: string,
    data: Partial<IBid>,
    session?: ClientSession,
  ): Promise<IBid | null> {
    return BidModel.findByIdAndUpdate(id, data, {
      new: true,
      session: session ?? null,
    }).exec();
  }
}
