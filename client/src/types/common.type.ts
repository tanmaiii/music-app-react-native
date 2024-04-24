export interface PaginationParams {
  limit: number;
  page: number;
  totalCount: number;
  totalPages: number;
}

export interface ListResponse<T> {
  data: T[];
  pagination: PaginationParams;
}
