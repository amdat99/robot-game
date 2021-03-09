const webSocketsServerPort = 8000;
const socket = require('socket.io')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

const server = app.listen(webSocketsServerPort,function()
{console.log("on 8000")});

const io = socket(server)
app.use(bodyParser.json());
app.use(cors())

let names = []

app.post('/fetchNames', (req,res)=>{  // fetch room data
      res.json(names[names.length -1]);
	})
	
app.post('/addname',(req,res)=>{  
   let name = req.body.room
   console.log(name)
   
   names.push(name)
  
   })

 io.on('connection', (socket) => {
   let socketRoom;
   console.log(`Connected ${socket.id}`);
   
   socket.on('disconnect', () =>
      console.log(`Disconnected ${socket.id}`));
   
      socket.on('join', (room) => {
      console.log(` ${socket.id} joined ${room}`);
      socket.join(room);
      socketRoom = room;
   });

   socket.on('switch', (data) => {
      const { prevRoom, nextRoom } = data;
      if (prevRoom) socket.leave(prevRoom);
      if (nextRoom) socket.join(nextRoom);
      socketRoom = nextRoom;
    });
    
    socket.on('name', (data) => {
      const { name } = data;
      console.log(`name: ${name}, room: ${socketRoom}`);
      io.to(socketRoom).emit('name', name, socketRoom );
    })

    socket.on('turn', (data) => {
      const { turn } = data;
      console.log(`turn: ${turn}, room: ${socketRoom}`);
      io.to(socketRoom).emit('turn', turn, socketRoom );
   });


   socket.on('action1', (data) => {
      const { action } = data;
   
      console.log(`action1: ${action}, room: ${socketRoom}`);
      io.to(socketRoom).emit('action1', action, socketRoom );
   });

   socket.on('action2', (data) => {
      const { action } = data;
      console.log(`action2: ${action}, room: ${socketRoom}`);
      io.to(socketRoom).emit('action2', action, socketRoom );
   });
});


