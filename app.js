// Setup Express
const express = require("./node_modules/express");
const app = express();
const http = require("http");

// Setup Socket.IO, bind to Express
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);
const initListeners = require("./Socket/listeners");

// Other Utilities
const log = require("./utils/log");
const dotenv = require("dotenv");

// Mongoose
const mongoose = require("mongoose");

// Routers
const gameCoreRouter = require("./routes/game/gameApi");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");

dotenv.config();

// Format the JSON Response
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", authRoute);
app.use("/api/post", postRoute);
app.set("json spaces", 2);

// Setup Routers
app.use("/game", gameCoreRouter);

// Initialize Socket IO Listeners
initListeners(io);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to PlayReversi API" });
});

// Connect to Databse
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => log("CONNECTED TO DATABASE", "success")
);

// API Server Initialization
server.listen("8000", () => {
  log("Server Listened on 8000", "success");
});
