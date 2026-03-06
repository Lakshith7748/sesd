import { Router } from 'express';
import { AdminController } from '../controllers/AdminController';
import { AdminService } from '../services/AdminService';
import { MongoUserRepository } from '../repositories/implementations/MongoUserRepository';
import { MongoProjectRepository } from '../repositories/implementations/MongoProjectRepository';
import { MongoDisputeRepository } from '../repositories/implementations/MongoDisputeRepository';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { UserRole } from '../types';

const router = Router();

const userRepo = new MongoUserRepository();
const projectRepo = new MongoProjectRepository();
const disputeRepo = new MongoDisputeRepository();
const adminService = new AdminService(userRepo, projectRepo, disputeRepo);
const adminController = new AdminController(adminService);

router.use(authenticate, authorize(UserRole.ADMIN));

router.get('/users', adminController.getAllUsers);
router.patch('/users/:userId/block', adminController.blockUser);
router.patch('/users/:userId/unblock', adminController.unblockUser);
router.get('/projects', adminController.getAllProjects);
router.get('/disputes', adminController.getAllDisputes);
router.post('/disputes', adminController.openDispute);
router.patch('/disputes/:disputeId/resolve', adminController.resolveDispute);

export default router;
