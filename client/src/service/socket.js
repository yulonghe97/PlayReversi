import io from "socket.io-client";

export const socket = io("http://localhost:8000", {
  reconnection: true,
  reconnectionDelay: 500,
  reconnectionAttempts: 10,
});
