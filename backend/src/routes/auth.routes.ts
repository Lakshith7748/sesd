import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { AuthService } from "../services/AuthService";
import { MongoUserRepository } from "../repositories/implementations/MongoUserRepository";

const router = Router();

const userRepo = new MongoUserRepository();
const authService = new AuthService(userRepo);
const authController = new AuthController(authService);

router.post("/register", authController.register);

router.post("/login", authController.login);

export default router;
