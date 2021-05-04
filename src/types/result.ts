export interface Result<T> {
  code: number;
  msg: string;
  object: T;
}
