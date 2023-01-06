import { io } from 'socket.io-client';

const uri = `http://localhost:${process.env.PORT}`;

export default (path = '/', options = {}) => {
  return io(uri + path, {
    autoConnect: false,
    ...options
  });
};
