const io = require("socket.io")(4001, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let activeUsers = [];
console.log("lkkk");
io.on("connection", (socket) => {
  console.log("socketttt");
  socket.on("new-user-add", (newUserId) => {
    console.log(newUserId, "newuser");
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      console.log("pushed");
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
    }
  });
  io.emit("get-users", activeUsers);
  console.log("active", activeUsers);

  socket.on("send-message", (msg) => {
    console.log("message", msg);
    let receiverId = msg?.receiverId;
    console.log(receiverId);

    for (let i = 0; i < receiverId?.length; i++) {
      console.log("enterd");
      const user = activeUsers.find((user) => user.userId == receiverId[i]);
      console.log(user);
      if (user) {
        console.log("receiver", user);
        io.to(user.socketId).emit("receiver-message", msg);
        console.log("active rr", activeUsers);
      }
    }
  });

  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId != socket.id);
    console.log("disconnected");
    io.emit("get-users", activeUsers);
    console.log("active af dis", activeUsers);
  });
});
