import axios from "../Axios/Axios";
// import Swal from "sweetalert2"


export const userCreateChats = async (id) => {
  let { data } = await axios.post('/chat/',{id} , {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return data
}
export const userChats = async (id) => {
  let { data } = await axios.get(`/chat/${id} `, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return data
}
export const getUserChatApi = async (id) => {
  let { data } = await axios.get(`/chat/user/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return data
}
export const getMessageChatApi = async (chatId) => {
  let { data } = await axios.get(`/chat/message/${chatId}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return data
}
export const addMessage=async(data)=>{
    let datas=await axios.post('/chat/message/',{...data}
    , {
        headers: {
          'Content-Type': 'application/json'
        }}
    )
    return datas
}