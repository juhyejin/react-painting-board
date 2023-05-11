import Modal from "@/components/Molecule/Modal/Modal.jsx";
import FormInputGroup from "@/components/Molecule/FormInputGroup/FormInputGroup.jsx";
import styled from "styled-components";
import useForm from "@/hooks/useForm.jsx";
import {socket} from "@/server.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";


const NewRoomModal = ({isNewRoom,clickClose}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const alertNewRoom = () =>{
      alert('이미 존재하는 방입니다.')
    }
    socket.on('existence-room',alertNewRoom )
    return () => {
      socket.off('existence-room',alertNewRoom )
    };
  }, []);


  const{ values, handleChange, handleSubmit } = useForm({
    initValues:{
      roomName :''
    },
    onSubmit: () => {
      socket.emit('create-room',values.roomName,()=>{
        navigate(`/room/${values.roomName}`)
      });
    }
  })

  return (
    <>
      {isNewRoom &&
        <Modal clickClose={clickClose}>
          <FormInputGroup placeholder='방이름을 입력하세요' btnInner='생성'  name='roomName' onSubmit={handleSubmit} onChange={handleChange}/>
        </Modal>
      }
    </>
  )
}

export default NewRoomModal


