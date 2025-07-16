export interface LoginData {
    username: string;
    password: string;
  }
  
  export interface AuthResponse {
    token: string;
    user_id: number;
    username: string;
  }
  
  export interface ErrorResponse {
    error: string;
  }