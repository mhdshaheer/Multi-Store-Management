import { NextFunction, Request, Response } from "express";
import { IAuthService } from "../../services/interfaces/auth.service.interface";
import { IAuthController } from "../interfaces/auth.controller.interface";
import { env } from "../../config/env.config";

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

  async verifyOtp(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { email, otp } = req.body;
      const token = await this._authService.verifyOtp({
        email,
        otp,
      });
      res.status(201).json({
        success: true,
        message: "Registration Successful",
        token,
      });
    } catch (error) {
      next(error);
    }
  }

  async resendOtp(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { email } = req.body;
      await this._authService.resendOtp({ email });
      res.status(200).json({
        success: true,
        message: "OTP sent successfully.",
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await this._authService.login({
        email,
        password,
      });
      res.cookie("refreshToken", token.accessToken, {
        httpOnly: true,
        secure: env.NODE_ENV == "production",
        sameSite: "strict",
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({
        success: true,
        message: "Login successful.",
      });
    } catch (error) {
      next(error);
    }
  }
}
