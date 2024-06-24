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

export interface UrlResponse {
  createdAt: string;
  description: null | string;
  id: number;
  name: string;
  shortId: string;
  updatedAt: string;
  website: string;
}
