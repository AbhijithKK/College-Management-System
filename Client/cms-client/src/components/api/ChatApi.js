import axios from "../Axios/Axios";
import Swal from "sweetalert2"


export const userChats = async (id) => {
  let { data } = await axios.get(`/chat/${id} `, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return data
}