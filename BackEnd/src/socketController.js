import randomNickName from "./randomNickName";

const socketMain =  (socket, wsServer)=>{

  socket.onAny((e)=>{
    console.log(e);
  });

  socket['nickName'] =  randomNickName()

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

  const joinRoom = (roomName)=>{
    socket.join(roomName);
  }

  socket.emit('random-nick',socket['nickName'])
  socket.on('create-room',(roomName,action)=>{
    const existenceCheck = publicRooms().indexOf(roomName)
    if(existenceCheck !== -1){
      socket.emit('existence-room')
    }else{
      joinRoom(roomName);
      action();
      wsServer.sockets.emit("room-list", publicRooms());
    }
  })

  socket.on('search-rooms',(roomName) =>{
    let publicRoom = [...publicRooms()];
    if(roomName.length === 0){
      socket.emit('room-list',publicRooms())
    }else{
      const searchRooms = publicRoom.filter((room)=>{
        return room.indexOf(roomName) > -1
      })
      socket.emit('room-list',searchRooms)
    }
  })

  socket.on('join-room',(roomName,action)=>{
    joinRoom(roomName)
    action()
  })

  socket.on('leave-room',(roomName)=>{
    socket.leave(roomName)
    wsServer.sockets.emit("room-list", publicRooms());
  })


  socket.on('change-nick-name',(action)=>{
    socket['nickName'] =  randomNickName();
    action(socket['nickName'])
  })
  socket.on('disconnect',()=>{
    console.log('끝!')
  })
}

export default socketMain
