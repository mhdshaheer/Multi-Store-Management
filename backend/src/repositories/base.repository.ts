import { Model, Document } from "mongoose";
import { IBaseRepository } from "./base.repository.interface";

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  constructor(protected model: Model<T>) {}

  async create(data: Partial<T>): Promise<T> {
    return await this.model.create(data);
  }

  async findOne(filter: Partial<T>): Promise<T | null> {
    return await this.model.findOne(filter);
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true },
    );
  }
  async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }
  async find(): Promise<T[]> {
    return await this.model.find();
  }
}
