import { ClientSession } from "mongoose";
import { IBid } from "../../models/Bid";

export interface IBidRepository {
  findById(id: string): Promise<IBid | null>;
  findByProject(projectId: string): Promise<IBid[]>;
  findByFreelancerAndProject(
    freelancerId: string,
    projectId: string,
  ): Promise<IBid | null>;
  findByFreelancer(freelancerId: string): Promise<IBid[]>;
  save(data: Partial<IBid>): Promise<IBid>;
  update(
    id: string,
    data: Partial<IBid>,
    session?: ClientSession,
  ): Promise<IBid | null>;
}
