import { client } from "./HTTPKIT";

const APIKit = {
  auth: {
    register: (payload) => {
      const url = "/api/user/register";
      return client.post(url, payload);
    },
  },
};

export default APIKit;
