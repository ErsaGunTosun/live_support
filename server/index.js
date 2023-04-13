const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const adminRoutes = require("./routes/adminAuth");
const colors = require('colors/safe');
const app = express();
const socket = require("socket.io");


require("dotenv").config();


app.use(cors());
app.use(express.json());

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin/auth", adminRoutes);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
const io = socket(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  },

});

// Global Variables
global.onlineUsers = new Map();
global.messagebox = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("login-box", ({ userId, box }) => {
    if (!onlineUsers.get(userId)) {
      onlineUsers.set(userId, socket.id)
    }
    messagebox.set(box._id, box);
    io.sockets.emit("user-login-box",({userId, box}));
    console.log('login')
  });

  socket.on("add-box-admin", (data) => {
    const box = messagebox.get(data.to);
    if (box) {
      box.adminastor = data.admin;
      messagebox.set(data.to, box);
    }
  });

  socket.on("send-msg", (data) => {
    const box = messagebox.get(data.to);
    if (box) {
      if (box.user == data.from) {
        if (box.adminastor) {
          const sendAdminSocket = onlineUsers.get(box.adminastor);
          if (sendAdminSocket) {
            console.log("2");
            let sendData = {
              msg: data.msg,
              time: data.time,
              to: box.adminastor,
            }
            console.log("admin", sendData)
            io.sockets.emit("msg-recieve", sendData);
          }
        }
      } else {

        const sendUserSocket = onlineUsers.get(box.user);
        if (sendUserSocket) {
          console.log("3");
          let sendData = {
            msg: data.msg,
            time: data.time,
            to: box.user,
          }
          console.log("user", sendData)
          io.sockets.emit("msg-recieve", sendData)
        }

      }
    }
  });

  socket.on("add-rate", (data) => {
    const { from, to, rate } = data;
    // send rate to admin

  })


});
