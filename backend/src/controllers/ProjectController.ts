import { Request, Response, NextFunction } from 'express';
import { ProjectService } from '../services/ProjectService';
import { CreateProjectDTO } from '../types';

export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  createProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clientId = req.user!.userId;
      const dto: CreateProjectDTO = req.body;
      const project = await this.projectService.createProject(clientId, dto);
      res.status(201).json({ success: true, data: project });
    } catch (err) {
      next(err);
    }
  };

  editProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clientId = req.user!.userId;
      const projectId = req.params['projectId'] as string;
      const dto: Partial<CreateProjectDTO> = req.body;
      const project = await this.projectService.editProject(clientId, projectId, dto);
      res.status(200).json({ success: true, data: project });
    } catch (err) {
      next(err);
    }
  };

  deleteProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clientId = req.user!.userId;
      const projectId = req.params['projectId'] as string;
      await this.projectService.deleteProject(clientId, projectId);
      res.status(200).json({ success: true, message: 'Project deleted' });
    } catch (err) {
      next(err);
    }
  };

  getOpenProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const projects = await this.projectService.getOpenProjects();
      res.status(200).json({ success: true, data: projects });
    } catch (err) {
      next(err);
    }
  };

  getMyProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clientId = req.user!.userId;
      const projects = await this.projectService.getMyProjects(clientId);
      res.status(200).json({ success: true, data: projects });
    } catch (err) {
      next(err);
    }
  };

  acceptBid = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clientId = req.user!.userId;
      const projectId = req.params['projectId'] as string;
      const bidId = req.params['bidId'] as string;
      const project = await this.projectService.acceptBid(clientId, projectId, bidId);
      res.status(200).json({ success: true, data: project });
    } catch (err) {
      next(err);
    }
  };

  markCompleted = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clientId = req.user!.userId;
      const projectId = req.params['projectId'] as string;
      const project = await this.projectService.markCompleted(clientId, projectId);
      res.status(200).json({ success: true, data: project });
    } catch (err) {
      next(err);
    }
  };
}
