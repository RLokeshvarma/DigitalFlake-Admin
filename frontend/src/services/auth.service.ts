import api from "./api";

export const loginApi = (email: string, password: string) => {
  return api.post("/auth/login", { email, password });
};

export const forgotPasswordApi = (email: string) => {
  return api.post("/auth/forgot-password", { email });
};

export const resetPasswordApi = (
  email: string,
  otp: string,
  newPassword: string
) => {
  return api.post("/auth/reset-password", {
    email,
    otp,
    newPassword,
  });
};
