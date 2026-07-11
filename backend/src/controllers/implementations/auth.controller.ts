import { NextFunction, Request, Response } from "express";
import { IAuthService } from "../../services/interfaces/auth.service.interface";
import { IAuthController } from "../interfaces/auth.controller.interface";

export class AuthController implements IAuthController {
  constructor(private _authService: IAuthService) {}

  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { name, email, password } = req.body;

      await this._authService.register({
        name,
        email,
        password,
      });

      res.status(200).json({
        success: true,
        message: "OTP sent successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
}
