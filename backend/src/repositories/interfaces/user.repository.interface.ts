import { IUser } from "../../models/user.model";
import { IBaseRepository } from "../base.repository.interface";

export interface IUserRepository extends IBaseRepository<IUser> {
  findByEmail(email: string): Promise<IUser | null>;
  isExist(email: string): Promise<boolean>;
}
