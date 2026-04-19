import { Request, Response, NextFunction } from "express";
import { BidService } from "../services/BidService";
import { PlaceBidDTO } from "../types";

export class BidController {
  constructor(private readonly bidService: BidService) {}

  placeBid = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const freelancerId = req.user!.userId;
      const projectId = req.params["projectId"] as string;
      const dto: PlaceBidDTO = req.body;
      const bid = await this.bidService.placeBid(freelancerId, projectId, dto);
      res.status(201).json({ success: true, data: bid });
    } catch (err) {
      next(err);
    }
  };

  withdrawBid = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const freelancerId = req.user!.userId;
      const bidId = req.params["bidId"] as string;
      await this.bidService.withdrawBid(freelancerId, bidId);
      res.status(200).json({ success: true, message: "Bid withdrawn" });
    } catch (err) {
      next(err);
    }
  };

  getBidsForProject = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const clientId = req.user!.userId;
      const projectId = req.params["projectId"] as string;
      const bids = await this.bidService.getBidsForProject(clientId, projectId);
      res.status(200).json({ success: true, data: bids });
    } catch (err) {
      next(err);
    }
  };

  getMyBids = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const freelancerId = req.user!.userId;
      const bids = await this.bidService.getMyBids(freelancerId);
      res.status(200).json({ success: true, data: bids });
    } catch (err) {
      next(err);
    }
  };
}
