import styled from "styled-components";
import {useEffect, useState} from "react";
import {socket} from "@/server.jsx";
import Button from "@/components/Atom/Button/Button.jsx";

const SettingPage = () => {

  const [nickName, setNickName] = useState(localStorage.getItem('userNickName'));

  const handleClick = () => {
    socket.emit('change-nick-name',(nickName) => {
      setNickName(nickName)
      localStorage.setItem('userNickName',nickName)
    })
  }

  return (
    <SettingContainer>
      <Title>
        닉네임 설정
      </Title>
      <NickNameContainer>
        {nickName}
        <Button btnInner='변경' onClick={handleClick}/>
      </NickNameContainer>
    </SettingContainer>
  )
}

export default SettingPage


const SettingContainer = styled.section`
  
`

const Title = styled.h3`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  padding: 20px 0;
`
const NickNameContainer  = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
