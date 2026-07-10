import { IUser } from "../../models/user.model";
import { BaseRepository } from "../base.repository";

export interface IUserRepository {
  findByEmail(email: string): Promise<IUser | null>;
  isExist(email: string): Promise<boolean>;
}
