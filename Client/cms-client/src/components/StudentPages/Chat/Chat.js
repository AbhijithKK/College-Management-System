import React from 'react'
import SideBarStudent from '../SideBar/SideBarStudent';
import { Container } from 'react-bootstrap';
import './Chat.css'
import Conversation from './Conversation';
import ChatBox from './ChatBox';
const Chat = () => {
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
           
                <Conversation
                  // data={chat}
                  // currentUser={user._id}
                  // online={checkOnlineStatus(chat)}
                />
              
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
