import {useNavigate, useParams} from "react-router-dom";
import useBack from "../hooks/useBack.jsx";
import {socket} from "../server.jsx";

const DrawRoomPage = () => {
  const{roomName} = useParams();
  const navigate = useNavigate();

  const handleClick = () =>{
    console.log(socket)
    socket.emit('leave-room',roomName)
    navigate(-1)
  }

  return (
    <div>
      방이름 : {roomName}
      <button type='button' onClick={handleClick}>나가기</button>
    </div>
  )
}

export default DrawRoomPage
