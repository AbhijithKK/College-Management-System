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
  try{
  let { data } = await axios.post("/chat/", { id }, header);
  if (data === false) {
    SwalError();
  }
  return data;
  }catch(err){
  SwalError();
}
};
export const userChats = async (id) => {
  try{
  let { data } = await axios.get(`/chat/${id} `, header);
  if (data === false) {
    SwalError();
  }
  return data;
  }catch(err){
  SwalError();
}
};
export const getUserChatApi = async (id) => {
  try{
  let { data } = await axios.get(`/chat/user/${id}`, header);
  if (data === false) {
    SwalError();
  }
  return data;
  }catch(err){
  SwalError();
}
};
export const getMessageChatApi = async (chatId) => {
  try{
  let { data } = await axios.get(`/chat/message/${chatId}`, header);
  if (data === false) {
    SwalError();
  }
  return data;
  }catch(err){
  SwalError();
}
};
export const addMessage = async (data) => {
  try{
  let datas = await axios.post("/chat/message/", { ...data }, header);
  if (data === false) {
    SwalError();
  }
  return datas;
}catch(err){
  SwalError();
}
};
