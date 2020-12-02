import io from "socket.io-client";

export const socket = io("https://api.reversi.pro", {
  reconnection: true,
  reconnectionDelay: 500,
  reconnectionAttempts: 10,
});
