import { Request, Response, NextFunction } from "express";
import { AdminService } from "../services/AdminService";

export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  blockUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await this.adminService.blockUser(req.params["userId"] as string);
      res.status(200).json({ success: true, message: "User blocked" });
    } catch (err) {
      next(err);
    }
  };

  unblockUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await this.adminService.unblockUser(req.params["userId"] as string);
      res.status(200).json({ success: true, message: "User unblocked" });
    } catch (err) {
      next(err);
    }
  };

  getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const users = await this.adminService.getAllUsers();
      res.status(200).json({ success: true, data: users });
    } catch (err) {
      next(err);
    }
  };

  getAllProjects = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const projects = await this.adminService.getAllProjects();
      res.status(200).json({ success: true, data: projects });
    } catch (err) {
      next(err);
    }
  };

  openDispute = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const raisedBy = req.user!.userId;
      const { projectId, reason } = req.body as {
        projectId: string;
        reason: string;
      };
      const dispute = await this.adminService.openDispute(
        raisedBy,
        projectId,
        reason,
      );
      res.status(201).json({ success: true, data: dispute });
    } catch (err) {
      next(err);
    }
  };

  resolveDispute = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const disputeId = req.params["disputeId"] as string;
      const { resolution } = req.body as { resolution: string };
      const dispute = await this.adminService.resolveDispute(
        disputeId,
        resolution,
      );
      res.status(200).json({ success: true, data: dispute });
    } catch (err) {
      next(err);
    }
  };

  getAllDisputes = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const disputes = await this.adminService.getAllDisputes();
      res.status(200).json({ success: true, data: disputes });
    } catch (err) {
      next(err);
    }
  };
}
