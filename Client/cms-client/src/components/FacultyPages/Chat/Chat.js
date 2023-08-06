import React, { useEffect, useRef, useState } from 'react'
import SideBarStudent from '../SideBar/SideBarFaculty';
import { Container } from 'react-bootstrap';
import './Chat.css'
import Conversation from './Conversation';
import ChatBox from './ChatBox';
import { FacultyProfileApi} from '../../api/FacultyApi';
import { userChats } from '../../api/ChatApi';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
const Chat = () => {
  const { refresh } = useSelector((state) => {

    return state
  })
  const [chats,setChats]=useState([])
  const[userData,setUserData]=useState({})
  const [currentChat,setCurrentChat]=useState(null)
  const [onlineUsers,setOnlineUsers]=useState([])
  const [sendMessage,setSendMessage]=useState(null)
  const [receiveMessage,setReceiveMessage]=useState(null)
  const socket=useRef()
  useEffect(()=>{
    
    const ChatApi=async()=>{
      let user=await FacultyProfileApi()
      setUserData(user)
      let chats=await userChats(user._id)
      setChats(chats)
      
    }
    ChatApi()
  },[refresh])
  useEffect(()=>{
    
    let id= localStorage.getItem('fid')
    console.log(id,'kk');
    socket.current=io("http://localhost:4001")
    socket.current.emit("new-user-add",id)
    socket.current.on('get-users',(users)=>{
      setOnlineUsers(users)
    })
  },[refresh])
  useEffect(()=>{
   
    socket.current.emit("send-message",sendMessage)
  },[sendMessage]) 
 
  useEffect(()=>{
    socket.current.on("receiver-message",(data)=>{
      console.log('receiver',data);
      setReceiveMessage(data)
    })
  },[])
  console.log(receiveMessage,'rr');
  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== userData._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };
  return (
    <div style={{backgroundColor:'gray'}}>
        <SideBarStudent/>
       <div >
        <Container>
        <>
        <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
    
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
           {chats.map((chat,i)=>(
            <div  key={i} onClick={()=>setCurrentChat(chat)}>
               <Conversation
                  data={chat}
                  currentUserId={userData._id}
                  online={checkOnlineStatus(chat)}
                />
              
              </div>
           ))}
               
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
       
        <ChatBox
          chat={currentChat}
          currentUserId={userData._id}
          setSendMessage={setSendMessage}
         receiveMessage={receiveMessage}
        />
      </div>
    </div>
    </>
        </Container>
       </div>

    </div>
  )
}

export default Chat
