// Setup Express
const express = require("./node_modules/express");
const app = express();
const http = require("http");
// Setup Socket.IO, bind to Express
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);

// Routers
const gameCoreRouter = require("./Routes/game/gameApi");

// Format the JSON Response
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("json spaces", 2);

// Setup Routers
app.use("/game", gameCoreRouter);

// Socket.io Initialization
let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

/*
    Function to Test Socket.io
*/
const getApiAndEmit = (socket) => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response.toLocaleString());
};

app.get("/", (req, res) => {
  res.json({ message: "Welcome to PlayReversi API" });
});

// API Server Initialization
server.listen("8001", () => {
  console.log("Server Listened on 8001");
});
