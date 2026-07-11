import { ResendOtpDto, VerifyOtpDto } from "../../dtos/otp.dto";
import { RegisterDto } from "../../dtos/register.dto";

export interface IAuthService {
  register(registerDto: RegisterDto): Promise<void>;
  verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<string>;
  resendOtp(resendOtpDto: ResendOtpDto): Promise<void>;
}
