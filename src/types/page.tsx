export interface Page<T> {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  size: number;
  totalElements: number;
  totalPages: number;
}
