import api from "./axios";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export const login = async (
  request: LoginRequest
): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/auth/login", request);
  return res.data;
};
