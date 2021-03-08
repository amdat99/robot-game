import io from 'socket.io-client';
let socket

export const initiateSocket = (room) => {
    socket = io('http://localhost:8000',{transports: ['websocket']});
    console.log(`Connecting`);
    if (socket && room) socket.emit('join', room);
  }
export const disconnectSocket = () => {
    console.log('Disconnecting');
    if(socket) socket.disconnect();
  }

  export  const enterName = (data) => {
    if (!socket) return;
    socket.on('name', name => {
      console.log('name recieved');
      return data(null, name);
    });
  }

  
  export  const enterTurn = (data) => {
    
    socket.on('turn', turn => {
      console.log('turn recieved')
      return data( turn);
    });
  }

 export const sendName = (name, room) => {
    if (socket) socket.emit('name', { name, room });
    
  }

  export const sendAction = (action, room) => {
    if (socket) socket.emit('action', { action, room });
    console.log(action)
   
  }
  export const sendTurn = (turn, room) => {
    if (socket) socket.emit('turn', { turn, room });
    console.log(turn)
  }


  export  const enterAction = (data) => {
    if (!socket) return;
    socket.on('action', action => {
      console.log('action recieved');
      return data(null, action);
    });
  }