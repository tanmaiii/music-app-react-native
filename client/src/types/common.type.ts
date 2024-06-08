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

export type TStateParams = {
  page: number;
  limit: number;
  loading: boolean;
  totalPages: number;
  totalCount: number;
  refreshing: boolean;
  keyword: string;
  sort: string;
};

export type ResSoPaAr = {
  type: string;
  id: string;
  title?: string;
  author?: string;
  name?: string;
  image_path?: string;
  public?: number;
  created_at: string;
};


export type TSongPlay = {
  id: string;
  num_song: number;
};