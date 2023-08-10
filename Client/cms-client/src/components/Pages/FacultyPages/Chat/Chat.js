import React, { useCallback, useEffect, useRef, useState } from "react";
import SideBarStudent from "../SideBar/SideBarFaculty";
import { Container, Row } from "react-bootstrap";
import "./Chat.css";
import Conversation from "./Conversation";
import ChatBox from "./ChatBox";
import { FacultyProfileApi } from "../../../api/FacultyApi";
import { userChats, userCreateChats } from "../../../api/ChatApi";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
const Chat = () => {
  const refresh = useSelector((state) => {
    return state?.refresh;
  });
  const [chats, setChats] = useState([]);
  const [userData, setUserData] = useState({});
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const socket = useRef();

  useEffect(() => {
    const ChatApi = async () => {
      let user = await FacultyProfileApi();
      userCreateChats(user._id);
      setUserData(user);
      let chats = await userChats(user._id);

      // const userIds = chats[0]?.members?.filter(id => id !== user._id);

      setChats(chats);
    };
    ChatApi();
  }, [refresh]);

  useEffect(() => {
    let id = localStorage.getItem("fid");

    socket.current = io(process.env.REACT_APP_SOCKET_IO);
    socket.current.emit("new-user-add", id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [refresh]);
  useEffect(() => {
    socket.current.emit("send-message", sendMessage);
  }, [sendMessage]);

  useEffect(() => {
    socket.current.on("receiver-message", (data) => {
      setReceiveMessage(data);
    });
  }, []);
  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.filter((member) => member !== userData._id);
    const online = onlineUsers.filter((user) => user.userId === chatMember);
    return online ? true : false;
  };
  const handleConversationClick = useCallback((chat, val, i) => {
    const updatedChat = { ...chat }; // Create a shallow copy of chat
    const newId = updatedChat.members[1];
    updatedChat.members[1] = val;
    updatedChat.members[i] = newId;
    setCurrentChat(updatedChat);
  }, []);

  return (
    <div style={{ backgroundColor: "gray",marginLeft:'60px ' }}>
      <SideBarStudent />
      
        <Container>
          <Row>
            <div className="Chat">
              {/* Left Side */}
              <div className="Left-side-chat">
                <div className="Chat-container">
                  <h2>Members</h2>
                  <div className="Chat-list">
                    {chats.map((chat, i) => (
                      <div key={i}>
                        {chat.members.map((val, j) =>
                          val !== userData._id ? (
                            <div key={j}
                              onClick={() =>
                                handleConversationClick(chat, val, j)
                              }
                            >
                              <Conversation
                                key={j}
                                data={val}
                                currentUserId={userData._id}
                                online={checkOnlineStatus(chat)}
                              />
                            </div>
                          ) : (
                            ""
                          )
                        )}
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
          </Row>
        </Container>
      
    </div>
  );
};

export default Chat;
