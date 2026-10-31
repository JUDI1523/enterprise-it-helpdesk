const API_BASE_URL =
  "https://helpdesk-api.alyaherp.com/api";

export async function apiRequest(
  endpoint,
  options = {}
) {
  const token = localStorage.getItem("authToken");

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Something went wrong."
    );
  }

  return data;
}