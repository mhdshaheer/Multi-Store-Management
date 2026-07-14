import { LoginDto } from "../../dtos/login.dto";
import { ResendOtpDto, VerifyOtpDto } from "../../dtos/otp.dto";
import { RegisterDto } from "../../dtos/register.dto";
import { IUser } from "../../models/user.model";

export interface IAuthService {
  register(registerDto: RegisterDto): Promise<void>;
  verifyOtp(
    verifyOtpDto: VerifyOtpDto,
  ): Promise<{ accessToken: string; refreshToken: string; user: IUser }>;
  resendOtp(resendOtpDto: ResendOtpDto): Promise<void>;
  login(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string; user: IUser }>;
}
