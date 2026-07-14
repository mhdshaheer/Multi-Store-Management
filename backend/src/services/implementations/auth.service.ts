import { RegisterDto } from "../../dtos/register.dto";
import { IUserRepository } from "../../repositories/interfaces/user.repository.interface";
import { IAuthService } from "../interfaces/auth.service.interface";
import bcrypt from "bcrypt";
import { redis_client } from "../../config/redis.config";
import { IMailService } from "../interfaces/mail.service.interface";
import { generateOTP } from "../../utils/otp";
import { ResendOtpDto, VerifyOtpDto } from "../../dtos/otp.dto";
import {
  generateAccessToken,
  generateRefreshToken,
  generateToken,
} from "../../utils/jwt.utils";
import { LoginDto } from "../../dtos/login.dto";

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
  async verifyOtp(
    verifyOtpDto: VerifyOtpDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
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
    const accessToken = generateAccessToken(
      createdUser._id.toString(),
      createdUser.role,
    );
    const refreshToken = generateRefreshToken(createdUser._id.toString());
    return {
      accessToken: accessToken,
      refreshToken: accessToken,
    };
  }

  async resendOtp(resendOtpDto: ResendOtpDto): Promise<void> {
    const { email } = resendOtpDto;
    const user = await this._userRepository.findByEmail(email);

    if (user) {
      throw new Error("Email already registered.");
    }

    const redisData = await redis_client.get(`otp:${email}`);

    if (!redisData) {
      throw new Error("Registration session expired. Please register again.");
    }

    const userData = JSON.parse(redisData);
    const otp = generateOTP();

    await redis_client.setEx(
      `otp:${email}`,
      300,
      JSON.stringify({
        ...userData,
        otp,
      }),
    );

    await this._mailService.sendOtp(email, otp);
  }
  async login(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = loginDto;
    const user = await this._userRepository.findByEmail(email);
    if (!user) {
      throw new Error("User is not exist");
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error("Password is incorrect");
    }
    const accessToken = generateAccessToken(user._id.toString(), user.role);
    const refreshToken = generateRefreshToken(user._id.toString());
    return {
      accessToken: accessToken,
      refreshToken: accessToken,
    };
  }
}
