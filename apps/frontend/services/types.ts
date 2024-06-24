// types.ts

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface ErrorResponse {
  message: string;
  statusCode: number;
}

export interface RowData {
  id: number;
  shortId: string;
  userId: number;
  name: string;
  description: string;
  website: string;
  createdAt: string;
  updatedAt: string;
}

export interface MetaData {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  firstPage: number;
  firstPageUrl: string;
  lastPageUrl: string;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
}

export interface UrlResponse {
  data: RowData[];
  meta: MetaData;
}
