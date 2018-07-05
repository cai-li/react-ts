let express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server),
  users = [];

var PORT = process.env.PORT || 1111
server.listen(PORT, function () { console.log('listen at ' + PORT) });

// handle the socket
io.sockets.on('connection', function (socket) {
  // new user login
  socket.on('login', function (nickname) {
    if (users.indexOf(nickname) > -1) {
      socket.emit('nickExisted', nickname, users);
    } else {
      // socket.userIndex = users.length;
      socket.nickname = nickname;
      users.push(nickname);
      socket.emit('loginSuccess', nickname, users);
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
  socket.on('postMsg', function (msg, color) {
    console.log(msg)
    socket.broadcast.emit('newMsg', socket.nickname, msg, color);
  });
  // new image get
  socket.on('img', function (imgData, color) {
    socket.broadcast.emit('newImg', socket.nickname, imgData, color);
  });
});
