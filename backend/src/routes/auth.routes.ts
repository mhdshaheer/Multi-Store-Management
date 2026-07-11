import { Router } from "express";
import { authController } from "../container/auth.container";

const authRouter = Router();

authRouter.post("/register", authController.register.bind(authController));
authRouter.post("/verify", authController.verifyOtp.bind(authController));
authRouter.post("/resend", authController.resendOtp.bind(authController));
authRouter.post("/login", authController.login.bind(authController));
authRouter.post("/logout", authController.logout.bind(authController));

export default authRouter;
