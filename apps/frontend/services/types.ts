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