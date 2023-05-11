import randomNickName from "./randomNickName";

const socketMain =  (socket, wsServer)=>{

  socket.onAny((e)=>{
    console.log('프론트 이벤트' + e);
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
  socket.emit('random-nick',socket['nickName'])

  socket.on('change-nick-name',(action)=>{
    socket['nickName'] =  randomNickName();
    action(socket['nickName'])
  })
  const joinRoom = (roomName)=>{
    socket.join(roomName);
  }

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
    socket.to(roomName).emit('new-message','system',`${socket.nickName}님이 입장하였습니다.`)
  })

  socket.on('new-message',(roomName,msg)=>{
    socket.to(roomName).emit('new-message','other',`${socket.nickName}: ${msg}`)
  })

  socket.on('leave-room',(roomName)=>{
    socket.leave(roomName)
    socket.to(roomName).emit('new-message','system',`${socket.nickName}님이 나가셨습니다.`)
  })

  socket.on('other-draw',(roomName,draw)=>{
    socket.to(roomName).emit('other-draw',draw);
  })

  socket.on('brush-info',(roomName,brushInfo)=>{
    // socket.to(roomName).emit('new-message','system',`${socket.nickName}님이 입장하였습니다.`)
  })

  socket.on('disconnect',()=>{
    console.log('끝!')
  })
}

export default socketMain
