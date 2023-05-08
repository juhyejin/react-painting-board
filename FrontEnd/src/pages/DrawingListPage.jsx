import Icons from "../components/Atom/Icons/Icons.jsx";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {socket} from "../server.jsx";
import {useNavigate} from "react-router-dom";
import NewRoomModal from "@/components/Organism/NewRoomModal/NewRoomModal.jsx";
import ButtonGroup from "@/components/Molecule/ButtonGroup/ButtonGroup.jsx";
import FormInputGroup from "@/components/Molecule/FormInputGroup/FormInputGroup.jsx";
import RoomCard from "@/components/Molecule/RoomCard/RoomCard.jsx";
import useForm from "@/hooks/useForm.jsx";
import useDebounce from "@/hooks/useDebounce.jsx";

const DrawingListPage = () => {
  const [isSearchForm, setIsSearchForm] = useState(false);
  const [isNewRoomModal, setIsNewRoomModal] = useState(false);
  const [roomList, setRoomList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getRooms = (rooms)=>{
      setRoomList(rooms);
    };
    socket.on('room-list',getRooms);
    return () => {
      socket.off('room-list',getRooms);
    };
  }, []);


  const{ values, handleChange, handleSubmit } = useForm({
    initValues:{
      searchValue:''
    },
    onSubmit: () => {}
  })

  const searchRoom = useDebounce(values.searchValue,500);
  useEffect(() => {
      socket.emit('search-rooms',searchRoom)
  }, [searchRoom]);


  const joinRoom = (roomName) =>{
    const pushRoom = () =>{
      navigate(`/room/${roomName}`)
    }
    socket.emit('join-room',roomName,pushRoom)
  }

  const ButtonGroupInfo = [
    {
      iconName: 'searchIcon',
      onClick: () => {
        setIsSearchForm(true)
      }
    },
    {
      iconName: 'plusIcon',
      onClick: () =>{
        setIsNewRoomModal(true)
      }
    },
    {
      iconName: 'fastForwardIcon',
      onClick: () =>{
        console.log('랜덤 방 들어가기')
      }
    },
  ]

  const FormStyleOfFormInputGroup = {
    boxShadow: '0 1px 3px rgba(0,0,0,.25)',
    padding: '5px 20px',
    borderRadius: '10px'
  }

  return (
    <>
      <NewRoomModal isNewRoom={isNewRoomModal} clickClose={()=>setIsNewRoomModal(false)}></NewRoomModal>
      <section className="room-control-section">
        {
          isSearchForm ?
            (
              <SearchDiv>
                <FormInputGroup btnInner='찾기' notBtn={true} name="searchValue" formStyle={FormStyleOfFormInputGroup} onSubmit={handleSubmit} onChange={handleChange}/>
                <IconBox onClick={()=>setIsSearchForm(false)}>
                  <Icons name='closeIcon'/>
                </IconBox>
              </SearchDiv>
            ) :
            (
              <ButtonBox>
                <ButtonGroup btnItems={ButtonGroupInfo} variant={'active'}/>
              </ButtonBox>
            )
        }
      </section>
      <section className="room-list-section">
        <ul>
          {roomList.length >= 1 ? (
              roomList.map((room,index)=>(
                <LiForRoomList key={index} >
                  <RoomCard roomName={room} onClick={()=>joinRoom(room)}/>
                </LiForRoomList>
              ))
            ):
            <>아직 방이 없습니다.</>}
        </ul>
      </section>
    </>
  )
}


export default DrawingListPage

const SearchDiv = styled.div `
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
`
const IconBox = styled.div`
  position: absolute;
  top: 50%;
  right: 25px;
  cursor: pointer;
  transform: translateY(-50%);
`
const LiForRoomList = styled.li`
  margin: 10px 0;
`
const ButtonBox = styled.div`
  width: 20%;
  margin: 0 auto;
`
