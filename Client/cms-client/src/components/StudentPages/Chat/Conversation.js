import React from 'react'

const Conversation = () => {
  return (
    <div>
      <>
      <div className="follower conversation">
        <div>
          { <div className="online-dot"></div>}
          <img
            src='https://freepngimg.com/thumb/chat/1-2-chat-png-image.png'
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{fontSize: '0.8rem'}}>
            <span>Name</span>
            {/* <span style={{color: online?"#51e200":""}}>{online? "Online" : "Offline"}</span> */}
            online
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
    </div>
  )
}

export default Conversation
