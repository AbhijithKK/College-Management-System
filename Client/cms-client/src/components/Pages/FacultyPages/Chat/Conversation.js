import React, { useEffect, useState } from "react";
import { getUserChatApi } from "../../../api/ChatApi";
const Conversation = ({ data, currentUserId, online }) => {
  const [userData, SetUserData] = useState(null);
  useEffect(() => {
    // const userId = data?.find((id) => id !== currentUserId)

    const GetSecondUserData = async () => {
      let user = await getUserChatApi(data);
      SetUserData(user);
    };
    if (data !== currentUserId) {
      GetSecondUserData();
    }
  }, [currentUserId, data]);
const DefaultImg="https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png"
  return (
    <div>
      <>
        <div className="follower conversation">
          <div>
            {<div className="online-dot"></div>}
            <img
              src={userData?.image==="noImg" 
              ? DefaultImg 
              :process.env.REACT_APP_IMG_URL+userData?.image }
              alt="Profile"
              className="followerImage"
              style={{ width: "50px", height: "50px" ,borderRadius:'35px'}}
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
