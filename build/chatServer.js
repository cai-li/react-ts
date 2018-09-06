let express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server),
  users = [];

var PORT = process.env.PORT || 4848
server.listen(PORT, function () { console.log('listen at ' + PORT) });

console.log('初始')
// handle the socket
io.sockets.on('connection', function (socket) {
  // new user enterChat
  socket.on('enterChat', function (nickname) {
    if (users.indexOf(nickname) > -1) {
      socket.emit('nickExisted', nickname, users);
    } else {
      // socket.userIndex = users.length;
      socket.nickname = nickname;
      users.push(nickname);
      socket.emit('enterChatSuccess', nickname, users);
      io.sockets.emit('system', nickname, users, 'login');
    }
  });
  // user leaves
  socket.on('disconnect', function () {

    if (socket.nickname != null) {
      // users.splice(socket.userIndex, 1);
      users.splice(users.indexOf(socket.nickname), 1);
      socket.broadcast.emit('system', socket.nickname, users, 'logout');
    }
  });
  // new message get
  socket.on('postMsg', function (msg) {
    io.sockets.emit('newMsg', socket.nickname, msg);
  });
  // new image get
  socket.on('postImg', function (imgData) {
    console.log(imgData)
    io.sockets.emit('newImg', socket.nickname, imgData);
   // socket.broadcast.emit('newImg', socket.nickname, imgData);
  });
});
