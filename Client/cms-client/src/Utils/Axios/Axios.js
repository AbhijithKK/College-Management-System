import axios from "axios";

const Instance = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,

});
export default Instance;
