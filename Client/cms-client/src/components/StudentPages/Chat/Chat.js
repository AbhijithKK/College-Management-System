import React, { useEffect, useState } from 'react'
import SideBarStudent from '../SideBar/SideBarStudent';
import { Container } from 'react-bootstrap';
import './Chat.css'
import Conversation from './Conversation';
import ChatBox from './ChatBox';
import { async } from 'react-input-emoji';
import { StudentProfileApi } from '../../api/StudentApi';
import { userChats } from '../../api/ChatApi';
const Chat = () => {
  const [chats,setChats]=useState([])
  const[userData,setUserData]=useState({})
  useEffect(()=>{
    
    const ChatApi=async()=>{
      let user=await StudentProfileApi()
      setUserData(user)
      let chats=await userChats(user._id)
      setChats(chats)
      console.log(chats);
    }
    ChatApi()
  },[])
  return (
    <div style={{backgroundColor:'gray'}}>
        <SideBarStudent/>
       <div >
        <Container>
        <>
        <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
       searchlogo
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
           {chats.map((chat)=>(
            <div>
               <Conversation
                  data={chat}
                  currentUserId={userData._id}
                 
                />
              
              </div>
           ))}
               
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
       
        <ChatBox
          // chat={currentChat}
          // currentUser={user._id}
          // setSendMessage={setSendMessage}
          // receivedMessage={receivedMessage}
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
