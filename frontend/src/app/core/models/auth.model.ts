export interface ILogin {
  email: string;
  password: string;
  role?: 'ADMIN' | 'USER';
}
export interface IRegister {
  name: string;
  email: string;
  password: string;
  role?: 'ADMIN' | 'USER';
}
export interface IVerifyOtp {
  email: string;
  otp: string;
}
export interface ICurrentUser {
  _id: string;
  role: 'ADMIN' | 'USER';
}
