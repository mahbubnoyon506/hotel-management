import { client } from "./HTTPKIT";

const defaultFileUploadConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

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
    logout: () => {
      const url = "/api/user/logout";
      return client.post(url);
    },
  },
  myHotels: {
    addHotel: (payload) => {
      const url = "/api/my-hotels/add";
      return client.post(url, payload, defaultFileUploadConfig);
    },
    allHotels: (payload) => {
      const url = "/api/my-hotels";
      return client.get(url, payload);
    },
  },
};

export default APIKit;
