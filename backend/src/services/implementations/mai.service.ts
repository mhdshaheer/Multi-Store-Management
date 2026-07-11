import nodemailer from "nodemailer";
import { IMailService } from "../interfaces/mail.service.interface";
import { env } from "../../config/env.config";

export class MailService implements IMailService {
  private _transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.MAIL_USER,
      pass: env.MAIL_PASSWORD,
    },
  });

  async sendOtp(email: string, otp: string): Promise<void> {
    await this._transporter.sendMail({
      from: env.MAIL_USER,
      to: email,
      subject: "Email Verification OTP",
      html: `
                <h2>Email Verification</h2>

                <p>Your OTP is</p>

                <h1>${otp}</h1>

                <p>This OTP expires in 5 minutes.</p>
            `,
    });
  }
}
