import { apiRequest } from "./apiClient";

export async function getTickets() {
  return apiRequest("/tickets");
}

export async function createTicket(ticketData) {
  return apiRequest("/tickets", {
    method: "POST",
    body: JSON.stringify(ticketData),
  });
}

export async function getTicket(id) {
  return apiRequest(`/tickets/${id}`);
}

export async function updateTicketStatus(id, status) {
  return apiRequest(`/tickets/${id}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
}

export async function addTicketReply(id, message) {
  return apiRequest(`/tickets/${id}/reply`, {
    method: "POST",
    body: JSON.stringify({ message }),
  });
}