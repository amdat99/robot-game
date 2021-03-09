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
    if (!socket) return;
    socket.on('turn', turn => {
      console.log('turn recieved')
      return data( null,turn);
    });
  }

 export const sendName = (name, room) => {
    if (socket) socket.emit('name', { name, room });
    
  }

  export const sendAction1 = (action, room) => {
    if (socket) socket.emit('action1', { action, room });
    console.log(action)
   
  }

  export const sendAction2 = (action, room) => {
    if (socket) socket.emit('action2', { action, room });
    console.log(action)
   
  }
  export const sendTurn = (turn, room) => {
    
    if (socket) socket.emit('turn', { turn, room });
    console.log(turn)
  }


  export  const enterAction1 = (data) => {
    if (!socket) return;
    socket.on('action1', action => {
      console.log('action1 recieved');
      return data(null, action);
    });
  }

  export  const enterAction2 = (data) => {
    if (!socket) return;
    socket.on('action2', action => {
      console.log('action1 recieved');
      return data(null, action);
    });
  }