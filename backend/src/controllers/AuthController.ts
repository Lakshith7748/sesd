import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthService";
import { RegisterDTO, LoginDTO } from "../types";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const dto: RegisterDTO = req.body;
      const user = await this.authService.register(dto);
      res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          skills: user.skills,
        },
      });
    } catch (err) {
      next(err);
    }
  };

  login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const dto: LoginDTO = req.body;
      const token = await this.authService.login(dto);
      res.status(200).json({ success: true, data: { token } });
    } catch (err) {
      next(err);
    }
  };
}
