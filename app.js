// Setup Express
const express = require("./node_modules/express");
const app = express();
const http = require("http");
// Setup Socket.IO, bind to Express
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);
const initListeners = require("./Socket/listeners");

// Routers
const gameCoreRouter = require("./Routes/game/gameApi");

// Format the JSON Response
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("json spaces", 2);

// Setup Routers
app.use("/game", gameCoreRouter);

// Initialize Socket IO Listeners
initListeners(io);


app.get("/", (req, res) => {
  res.json({ message: "Welcome to PlayReversi API" });
});

// API Server Initialization
server.listen("8001", () => {
  console.log("Server Listened on 8001");
});
