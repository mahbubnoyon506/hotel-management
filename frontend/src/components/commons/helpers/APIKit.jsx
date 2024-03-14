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
  hotels: {
    allhotels: (payload) => {
      const url = "/api/hotels/search";
      return client.get(url, payload);
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
    hotelDetails: (params) => {
      const url = `/api/my-hotels/${params}`;
      return client.get(url);
    },
    putHotelDetails: (params, payload) => {
      const url = `/api/my-hotels/${params}`;
      return client.patch(url, payload, defaultFileUploadConfig);
    },
  },
};

export default APIKit;
