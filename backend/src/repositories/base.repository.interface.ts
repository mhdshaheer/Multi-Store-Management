export interface IBaseRepository<T> {
  create(data: Partial<T>): Promise<T>;
  findOne(filter: Partial<T>): Promise<T | null>;
  findById(id: string): Promise<T | null>;
  find(): Promise<T[]>;
  update(id: string, data: Partial<T>): Promise<T | null>;
}
