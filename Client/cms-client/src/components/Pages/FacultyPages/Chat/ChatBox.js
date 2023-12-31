import React, { useEffect, useRef, useState } from "react";
import "./ChatBox.css";
import InputEmoji from "react-input-emoji";
import Timeago from 'react-timeago'
import {
  addMessage,
  getMessageChatApi,
  getUserChatApi,
} from "../../../api/ChatApi";
const ChatBox = ({ chat, currentUserId, setSendMessage, receiveMessage }) => {
  const [newMessage, setNewMessage] = useState("");
  const [userData, SetUserData] = useState(null);
  const [oldMessage, setOldMessage] = useState([]);
  const handleChange = (msg) => {
    setNewMessage(msg);
  };
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUserId);
    const GetSecondUserData = async () => {
      let user = await getUserChatApi(userId);
      SetUserData(user);
    };
    if (chat !== null) GetSecondUserData();
  }, [chat, currentUserId]);
  useEffect(() => {
    const GetMessages = async () => {
      let messages = await getMessageChatApi(chat._id);
      setOldMessage(messages);
    };
    if (chat !== null) GetMessages();
  }, [chat]);
  const handleSend = async (e) => {
    e.preventDefault();
    let name = localStorage.getItem("fname");
    const message = {
      senderId: currentUserId,
      text: newMessage,
      chatId: chat._id,
      name: name,
    };
    const data = await addMessage(message);
    setOldMessage([...oldMessage, data.data]);
    setNewMessage("");
    const receiverId = chat.members.filter((id) => id !== currentUserId);
    setSendMessage({ ...message, receiverId });
  };
  useEffect(() => {
    if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
      setOldMessage([...oldMessage, receiveMessage]);
    }
  }, [receiveMessage, chat]);
  const scoll = useRef();
  useEffect(() => {
    scoll.current?.scrollIntoView({ behvior: "smooth" });
  }, [oldMessage]);
  const DefaultImg="https://freepngimg.com/thumb/chat/1-2-chat-png-image.png"

  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            {/* chat-header */}
            <div className="chat-header">
              <div className="follower">
                <div>
                  <img
                    src={
                    DefaultImg 
                    }
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>{userData?.department}__{userData?.className} GROUP</span>
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
            <div className="chat-body">
              {oldMessage.map((messages, i) => (
                <div
                  key={i}
                  ref={scoll}
                  className={
                    messages.senderId === currentUserId
                      ? "message own"
                      : "message"
                  }
                >
                  <span>{
                   messages.senderId === currentUserId ?'You':
                  messages.name}</span>
                  <span>{messages.text}</span> 
                  <span><Timeago date={messages.createdAt}/></span>
                </div>
              ))}
            </div>
            {/* chat-sender */}
            <div className="chat-sender">
              <div style={{ color: "black " }}>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div className="send-button button" onClick={handleSend}>
                Send
              </div>
              <input type="file" name="" id="" style={{ display: "none" }} />
            </div>{" "}
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
