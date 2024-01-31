import axios from "axios";
import { User } from "types/user";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

// export function authenticateUser(code: string) {
//   return api.post<User>("/request_access_token", {}, { params: { code } });
// }
export function authenticateUser(code: string) {
  return api
    .post<User>("/request_access_token", {}, { params: { code } })
    .then((response) => response.data);
}

export function getClients() {
  return api.get("/clients");
}

export function logout() {
  return api.get("/logout");
}

export function getRequiresInvoiceJobs() {
  const options = {
    params: {
      filter: {
        status: "requires_invoicing",
      },
    },
  };

  return api.get("/joblist", options);
}
export function getActionRequiredJobs() {
  const options = {
    params: {
      filter: {
        status: "action_required",
      },
    },
  };

  return api.get("/joblist", options);
}
export function getLateJobs() {
  const options = {
    params: {
      filter: {
        status: "late",
      },
    },
  };

  return api.get("/joblist", options);
}
export function getQuoteApprovedJobs() {
  const options = {
    params: {
      filter: {
        status: "approved",
      },
    },
  };

  return api.get("/quotelist", options);
}
export function getInvoiceDraftedJobs() {
  const options = {
    params: {
      filter: {
        status: "draft",
      },
    },
  };

  return api.get("/invoicelist", options);
}

export default api;
