
const socketMain = function (socket, wsServer){

  socket.onAny((e)=>{
    console.log(e);
  });
  const publicRooms =  () => {
    const {
      sockets: {
        adapter: { sids, rooms },
      },
    } = wsServer;
    let publicRoom = []
    rooms.forEach((_, key) => {
      if (sids.get(key) === undefined) {
        publicRoom.push(key);
      }
    });
    return publicRoom;
  }
  const enterRoom = (roomName)=>{
    socket.join(roomName);
  }
  socket.on('get-rooms',(action)=>{
    action(publicRooms())
  })
  socket.on('create-room',(roomName,action)=>{
    const existenceCheck = publicRooms().indexOf(roomName)
    if(existenceCheck !== -1){
      socket.emit('existence-room')
    }else{
      enterRoom(roomName);
      action();
      wsServer.sockets.emit("room-list", publicRooms());
    }
  })

  socket.on('enter-room',(roomName,action)=>{
    enterRoom(roomName)
    action()
  })
  socket.on('leave-room',(roomName)=>{
    socket.leave(roomName)
    wsServer.sockets.emit("room-list", publicRooms());
  })

}

export default socketMain
