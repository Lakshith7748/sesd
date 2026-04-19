import { IDispute } from "../../models/Dispute";

export interface IDisputeRepository {
  findById(id: string): Promise<IDispute | null>;
  findByProject(projectId: string): Promise<IDispute | null>;
  save(data: Partial<IDispute>): Promise<IDispute>;
  update(id: string, data: Partial<IDispute>): Promise<IDispute | null>;
  findAll(): Promise<IDispute[]>;
}
