import io from "socket.io-client";

export const socket = io("http://206.189.90.113", {
  reconnection: true,
  reconnectionDelay: 500,
  reconnectionAttempts: 10,
});
