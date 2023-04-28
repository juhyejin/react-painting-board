import styled from "styled-components";
import Input from "../input/Input.jsx";
import Icons from "../icons/Icons.jsx";
import Btn from "../button/Btn.jsx";
import {useEffect, useState} from "react";
import {socket} from "../../server.jsx";
import {useNavigate} from "react-router-dom";

const NewRoom = ({newRoom, _onClickClose}) => {

  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const check = ()=>{
      alert('이미 존재하는 방입니다.')
    }
    socket.on('existence-room',check)
    return () => {
      socket.off('existence-room',check)
    };
  }, []);

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }
  const pushRoom = () =>{
    navigate(`/room/${inputValue}`)
  }
  const handleSubmit = (e)=> {
    e.preventDefault();
    socket.emit('create-room',inputValue,pushRoom);
  }

  return (
    <>
    {newRoom &&  (
      <Overlay>
        <Card>
          <form onSubmit={handleSubmit}>
            <Input placeholder={'방이름을 입력해주세요.'} _onChange={handleChange}/>
            <div onClick={_onClickClose}>
              <Icons name={'closeIcon'} width={15} propsClassName={"searchIcon"} ></Icons>
            </div>
            <Btn btnType="submit" BtnName={'생성'}></Btn>
          </form>
        </Card>
      </Overlay>)
    }
    </>
  )
}

export default NewRoom

const Overlay = styled.div`
  background: rgba(0,0,0, .2);
  position: fixed;
  top:0;
  left: 0;
  height: 100%;
  width: 100%;
 `
const Card = styled.div`
  width: 300px;
  height: 200px;
  background: #FFF;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 75px);
  border-radius: 10px;
  padding: 10px;
`
