import { RegisterDto } from "../../dtos/register.dto";
import { IUserRepository } from "../../repositories/interfaces/user.repository.interface";
import { IAuthService } from "../interfaces/auth.service.interface";
import bcrypt from "bcrypt";
import { redis_client } from "../../config/redis.config";
import { IMailService } from "../interfaces/mail.service.interface";
import { generateOTP } from "../../utils/otp";
import { VerifyOtpDto } from "../../dtos/otp.dto";
import { generateToken } from "../../utils/jwt.utils";

export class AuthService implements IAuthService {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _mailService: IMailService,
  ) {}

  async register(registerDto: RegisterDto): Promise<void> {
    const { name, email, password } = registerDto;

    // Check if user already exists
    const existingUser = await this._userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error("Email already registered");
    }

    // Check if OTP already exists
    const existingOtp = await redis_client.get(`otp:${email}`);

    if (existingOtp) {
      throw new Error(
        "OTP already sent. Please verify or wait until it expires.",
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();

    // Store in Redis
    await redis_client.setEx(
      `otp:${email}`,
      300,
      JSON.stringify({
        name,
        email,
        password: hashedPassword,
        otp,
      }),
    );

    // Sent mail
    await this._mailService.sendOtp(email, otp);
  }
  async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<string> {
    const { email, otp } = verifyOtpDto;
    const redisData = await redis_client.get(`otp:${email}`);
    if (!redisData) {
      throw new Error("OTP expired.");
    }
    const userData = JSON.parse(redisData);
    if (userData.otp !== otp) {
      throw new Error("Invalid OTP.");
    }
    const createdUser = await this._userRepository.create({
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });
    await redis_client.del(`otp:${email}`);
    const token = generateToken(createdUser._id.toString(), createdUser.role);
    return token;
  }
}
