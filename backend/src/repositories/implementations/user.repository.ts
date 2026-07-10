import { IUser, UserModel } from "../../models/user.model";
import { BaseRepository } from "../base.repository";
import { IUserRepository } from "../interfaces/user.repository.interface";

export class UserRepository
  extends BaseRepository<IUser>
  implements IUserRepository
{
  constructor() {
    super(UserModel);
  }
  async findByEmail(email: string): Promise<IUser | null> {
    return await this.model.findOne({ email });
  }
  async isExist(email: string): Promise<boolean> {
    const user = await this.model.exists({ email });
    return !!user;
  }
}
