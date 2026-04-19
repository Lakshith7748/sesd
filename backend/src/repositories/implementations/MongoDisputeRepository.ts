import DisputeModel, { IDispute } from "../../models/Dispute";
import { IDisputeRepository } from "../interfaces/IDisputeRepository";

export class MongoDisputeRepository implements IDisputeRepository {
  async findById(id: string): Promise<IDispute | null> {
    return DisputeModel.findById(id).exec();
  }

  async findByProject(projectId: string): Promise<IDispute | null> {
    return DisputeModel.findOne({ projectId }).exec();
  }

  async save(data: Partial<IDispute>): Promise<IDispute> {
    const dispute = new DisputeModel(data);
    return dispute.save();
  }

  async update(id: string, data: Partial<IDispute>): Promise<IDispute | null> {
    return DisputeModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async findAll(): Promise<IDispute[]> {
    return DisputeModel.find()
      .populate("projectId", "title")
      .populate("raisedBy", "name email")
      .sort({ createdAt: -1 })
      .exec();
  }
}
