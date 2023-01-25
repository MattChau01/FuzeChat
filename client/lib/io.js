import { io } from 'socket.io-client';

const uri = 'http://localhost:3000';

export default (path = '/', options = {}) => {
  return io(uri + path, {
    autoConnect: false,
    ...options
  });
};
