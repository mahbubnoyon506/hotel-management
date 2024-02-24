import axios from "axios";
import { deferred } from "./UtilKit";

export let client = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

const defer = new deferred();

const isReady = () => defer.promise;

const HTTPKit = {
  defer,
  isReady,
  get: (url, options) => {
    return client.get(url, options);
  },
  post: (url, payload) => {
    return client.post(url, payload);
  },
  put: (url, payload) => {
    return client.put(url, payload);
  },
  patch: (url, payload) => {
    return client.patch(url, payload);
  },
  delete: (url) => {
    return client.delete(url);
  },
};

export default HTTPKit;
