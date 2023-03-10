module.exports = io => {
  io.on('connection', socket => {

    socket.on('message', message => {
      io.emit('message', message);
    });

    socket.on('disconnect', () => {
      io.emit('message', { type: 'user-left', text: 'User has left' });
    });
  });
};
