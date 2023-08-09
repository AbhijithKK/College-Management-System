import axios from "../../Utils/Axios/Axios";
import Swal from "sweetalert2";

const header = {
  headers: {
    "Content-Type": "application/json",
  },withCredentials: true,
};

const SwalError = () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Login Again",
  });
};

export const userCreateChats = async (id) => {
  let { data } = await axios.post("/chat/", { id }, header);
  if (data === false) {
    SwalError();
  }
  return data;
};
export const userChats = async (id) => {
  let { data } = await axios.get(`/chat/${id} `, header);
  if (data === false) {
    SwalError();
  }
  return data;
};
export const getUserChatApi = async (id) => {
  let { data } = await axios.get(`/chat/user/${id}`, header);
  if (data === false) {
    SwalError();
  }
  return data;
};
export const getMessageChatApi = async (chatId) => {
  let { data } = await axios.get(`/chat/message/${chatId}`, header);
  if (data === false) {
    SwalError();
  }
  return data;
};
export const addMessage = async (data) => {
  let datas = await axios.post("/chat/message/", { ...data }, header);
  if (data === false) {
    SwalError();
  }
  return datas;
};
