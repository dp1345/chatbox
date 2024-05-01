const cors = {
    origin: "http://127.0.0.1:5500", // Replace with your client's origin
    methods: ["GET", "POST"] // Specify the HTTP methods you want to allow
};
var io = require('socket.io')(8080,{cors})
//   const ioWithCors = new Server(server, {
//     cors
//   });


const users = {};

io.on('connection', socket =>{
    console.log("socket",socket.connected);
    socket.on('new-user-joined', user =>{
        console.log("New user", user);
        users[socket.id] = user;
        socket.broadcast.emit('user-joined', user);
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, user: users[socket.id]})
    });    

     socket.on('disconnect', message =>{
            socket.broadcast.emit('left', users[socket.id]);
            delete users[socket.id];
            });    
    });