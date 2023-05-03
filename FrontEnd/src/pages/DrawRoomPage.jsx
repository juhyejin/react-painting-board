import {useNavigate, useParams} from "react-router-dom";
import {socket} from "../server.jsx";
import styled from "styled-components";
import Button from "@/components/Atom/Button/Button.jsx";

const DrawRoomPage = () => {
  const { roomName } = useParams();
  const navigate = useNavigate();

  const handleClick = () =>{
    socket.emit('leave-room',roomName)
    navigate(-1)
  }

  return (
    <MainContainer>
      <RoomHeader>
        방이름 : {roomName}
        <Button btnInner='나가기' onClick={handleClick}></Button>
      </RoomHeader>
      <DrawContainer>
        그림그리는 곳
      </DrawContainer>
      <ChatContainer>
        메세지
      </ChatContainer>
    </MainContainer>
  )
}

export default DrawRoomPage


const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 90vh;
`
const RoomHeader = styled.div`
  
`
const DrawContainer = styled.div`
  flex-grow: 3;
`
const ChatContainer = styled.div`
  flex-grow: 1;
`
