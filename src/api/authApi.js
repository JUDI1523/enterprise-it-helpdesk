import { apiRequest } from "./apiClient";

export async function loginUser(email, password) {
  return apiRequest("/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export async function registerUser(
  name,
  email,
  password,
  passwordConfirmation
) {
  return apiRequest("/register", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    }),
  });
}

export async function getCurrentUser() {
  return apiRequest("/me");
}

export async function logoutUser() {
  return apiRequest("/logout", {
    method: "POST",
  });
}

