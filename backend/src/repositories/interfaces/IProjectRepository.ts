import { ClientSession } from 'mongoose';
import { IProject } from '../../models/Project';

export interface IProjectRepository {
  findById(id: string, session?: ClientSession): Promise<IProject | null>;
  findAllOpen(): Promise<IProject[]>;
  findByClient(clientId: string): Promise<IProject[]>;
  save(data: Partial<IProject>): Promise<IProject>;
  update(id: string, data: Partial<IProject>, session?: ClientSession): Promise<IProject | null>;
  delete(id: string): Promise<void>;
  findAll(): Promise<IProject[]>;
}
