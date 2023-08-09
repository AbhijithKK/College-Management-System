import React, { useEffect, useState } from "react";
import { getUserChatApi } from "../../../api/ChatApi";
const Conversation = ({ data, currentUserId, online }) => {
  const [userData, SetUserData] = useState(null);
  useEffect(() => {
    const userId = data?.members?.find((id) => id !== currentUserId);
    const GetSecondUserData = async () => {
      let user = await getUserChatApi(userId);
      SetUserData(user);
    };
    GetSecondUserData();
  }, [currentUserId, data]);

  return (
    <div>
      <>
        <div className="follower conversation">
          <div>
            {<div className="online-dot"></div>}
            <img
              src="https://freepngimg.com/thumb/chat/1-2-chat-png-image.png"
              alt="Profile"
              className="followerImage"
              style={{ width: "50px", height: "50px" }}
            />
            <div className="name" style={{ fontSize: "0.8rem" }}>
              <span>{userData?.name}</span>
              <br />
              <span style={{ color: online ? "#51e200" : "" }}>
                {online ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        </div>
        <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
      </>
    </div>
  );
};

export default Conversation;
