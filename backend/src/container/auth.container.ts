import { AuthController } from "../controllers/implementations/auth.controller";
import { UserRepository } from "../repositories/implementations/user.repository";
import { AuthService } from "../services/implementations/auth.service";
import { MailService } from "../services/implementations/mai.service";

const userRepository = new UserRepository();
const mailService = new MailService();
const authService = new AuthService(userRepository, mailService);
export const authController = new AuthController(authService);
