import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { ProjectService } from "../services/ProjectService";
import { MongoProjectRepository } from "../repositories/implementations/MongoProjectRepository";
import { MongoBidRepository } from "../repositories/implementations/MongoBidRepository";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { UserRole } from "../types";
import { BidController } from "../controllers/BidController";
import { BidService } from "../services/BidService";
import { ByPriceAscending } from "../strategies/BidRankingStrategy";

const router = Router();

const projectRepo = new MongoProjectRepository();
const bidRepo = new MongoBidRepository();
const projectService = new ProjectService(projectRepo, bidRepo);
const projectController = new ProjectController(projectService);

const bidService = new BidService(bidRepo, projectRepo, new ByPriceAscending());
const bidController = new BidController(bidService);

router.get("/", authenticate, projectController.getOpenProjects);

router.get(
  "/mine",
  authenticate,
  authorize(UserRole.CLIENT),
  projectController.getMyProjects,
);

router.post(
  "/",
  authenticate,
  authorize(UserRole.CLIENT),
  projectController.createProject,
);

router.put(
  "/:projectId",
  authenticate,
  authorize(UserRole.CLIENT),
  projectController.editProject,
);

router.delete(
  "/:projectId",
  authenticate,
  authorize(UserRole.CLIENT),
  projectController.deleteProject,
);

router.patch(
  "/:projectId/bids/:bidId/accept",
  authenticate,
  authorize(UserRole.CLIENT),
  projectController.acceptBid,
);

router.patch(
  "/:projectId/complete",
  authenticate,
  authorize(UserRole.CLIENT),
  projectController.markCompleted,
);

router.get(
  "/:projectId/bids",
  authenticate,
  authorize(UserRole.CLIENT),
  bidController.getBidsForProject,
);

router.post(
  "/:projectId/bids",
  authenticate,
  authorize(UserRole.FREELANCER),
  bidController.placeBid,
);

export default router;
