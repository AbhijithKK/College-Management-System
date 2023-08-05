import React, { useState } from 'react'
import './ChatBox.css'
import InputEmoji from 'react-input-emoji'
const ChatBox = () => {
    const[newMessage,setNewMessage]=useState('')
    const handleChange=()=>{
        
    }
  return (
    <>
      <div className="ChatBox-container">
      <>
            {/* chat-header */}
            <div className="chat-header">
              <div className="follower">
                <div>
                  <img
                    src='https://freepngimg.com/thumb/chat/1-2-chat-png-image.png'
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>
                      name box
                    </span>
                  </div>
                </div>
              </div>
              <hr
                style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              />
            </div>
            {/* chat-body */}
            <div className="chat-body" >
             
                <>
                  <div 
                    className=
                    
                         "message own"
                        
                    
                  >
                    <span>box message</span>{" "}
                    <span>create time</span>
                  </div>
                </>
              
            </div>
            {/* chat-sender */}
            <div className="chat-sender">
            <InputEmoji
                value={newMessage}
                onChange={handleChange}
              />
              <div className="send-button button">Send</div>
              <input
                type="file"
                name=""
                id=""
                style={{ display: "none" }}
             
              />
            </div>{" "}
          </>
      </div>
    </>
  )
}

export default ChatBox
