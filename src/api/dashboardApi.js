import { apiRequest } from "./apiClient";

export async function getDashboardStats() {
  return apiRequest("/dashboard/stats");
}