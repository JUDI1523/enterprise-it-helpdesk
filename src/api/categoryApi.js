import { apiRequest } from "./apiClient";

export async function getCategories() {
  return apiRequest("/categories");
}

export async function createCategory(categoryData) {
  return apiRequest("/categories", {
    method: "POST",
    body: JSON.stringify(categoryData),
  });
}
