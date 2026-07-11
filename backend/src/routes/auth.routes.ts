import { Router } from "express";
import { authController } from "../container/auth.container";

const authRouter = Router();

authRouter.post("/register", authController.register.bind(authController));

export default authRouter;
