import Modal from "@/components/Molecule/Modal/Modal.jsx";
import FormInputGroup from "@/components/Molecule/FormInputGroup/FormInputGroup.jsx";
import styled from "styled-components";
import useForm from "@/hooks/useForm.jsx";
import {socket} from "@/server.jsx";
import {useNavigate} from "react-router-dom";


const NewRoomModal = ({isNewRoom,clickClose}) => {
  const navigate = useNavigate();

  const{ values, handleChange, handleSubmit } = useForm({
    initValues:{
      roomName :''
    },
    onSubmit: () => {
      socket.emit('create-room',values,()=>{
        navigate(`/room/${values.roomName}`)
      });
    }
  })

  return (
    <>
      {isNewRoom &&
        <Modal clickClose={clickClose}>
          <FormInputGroup btnInner='생성' name='roomName' onSubmit={handleSubmit} onChange={handleChange}/>
        </Modal>
      }
    </>
  )
}

export default NewRoomModal


