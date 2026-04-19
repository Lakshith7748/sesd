import { Router } from "express";
import { BidController } from "../controllers/BidController";
import { BidService } from "../services/BidService";
import { MongoBidRepository } from "../repositories/implementations/MongoBidRepository";
import { MongoProjectRepository } from "../repositories/implementations/MongoProjectRepository";
import { ByPriceAscending } from "../strategies/BidRankingStrategy";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { UserRole } from "../types";

const router = Router();

const bidRepo = new MongoBidRepository();
const projectRepo = new MongoProjectRepository();
const bidService = new BidService(bidRepo, projectRepo, new ByPriceAscending());
const bidController = new BidController(bidService);

router.get(
  "/mine",
  authenticate,
  authorize(UserRole.FREELANCER),
  bidController.getMyBids,
);

router.delete(
  "/:bidId/withdraw",
  authenticate,
  authorize(UserRole.FREELANCER),
  bidController.withdrawBid,
);

export default router;
