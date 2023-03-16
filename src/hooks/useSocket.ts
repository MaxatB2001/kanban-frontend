import { Socket, io } from "socket.io-client";

const useSocket = () => {
  let socket: Socket | null = null;
  return (): Socket => {
    if (socket) {
      return socket;
    }
    socket = io("http://localhost:3000");
    return socket;
  };
};

export default useSocket();