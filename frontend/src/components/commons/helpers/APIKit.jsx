import { client } from "./HTTPKIT";

const APIKit = {
  auth: {
    register: (payload) => {
      const url = "/api/user/register";
      return client.post(url, payload);
    },
    login: (payload) => {
      const url = "/api/user/login";
      return client.post(url, payload);
    },
    validateUser: (token) => {
      const url = "/api/user/validate-token";
      return client.get(url, { headers: { Authorization: `Bearer ${token}` } });
    },
  },
};

export default APIKit;
