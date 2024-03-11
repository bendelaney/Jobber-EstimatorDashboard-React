import axios from "axios";
import { User } from "types/user";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
});

export function authenticateUser(code: string) {
  return api.post<User>("/request_access_token", {}, { params: { code } });
}

export function getClients() {
  return api.get("/clients");
}

export function logout() {
  return api.get("/logout");
}

export function getRequiresInvoicingJobs() {
  const options = {
    params: {
      filter: {
        status: "requires_invoicing",
      },
    },
  };

  return api.get("/jobs", options);
}
export function getActionRequiredJobs() {
  const options = {
    params: {
      filter: {
        status: "action_required",
      },
    },
  };

  return api.get("/jobs", options);
}
export function getLateJobs() {
  const options = {
    params: {
      filter: {
        status: "late",
      },
    },
  };

  return api.get("/jobs", options);
}
export function getApprovedQuotes() {
  const options = {
    params: {
      filter: {
        status: "approved",
      },
    },
  };

  return api.get("/quotes", options);
}
export function getDraftInvoices() {
  const options = {
    params: {
      filter: {
        status: "draft",
      },
    },
  };

  return api.get("/invoices", options);
}

export default api;
