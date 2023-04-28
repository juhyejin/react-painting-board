import Input from "../components/Atom/Input/Input.jsx";
import Icons from "../components/Atom/Icons/Icons.jsx";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {socket} from "../server.jsx";
import {useNavigate} from "react-router-dom";
import NewRoomModal from "@/components/Organism/NewRoomModal/NewRoomModal.jsx";

const DrawingListPage = () => {
  const [isSearchForm, setIsSearchForm] = useState(false);
  const [isNewRoom, setIsNewRoom] = useState(false);
  const [roomList, setRoomList] = useState([]);
  const [isRoomList, setIsRoomList] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getRooms = (rooms)=>{
      setRoomList(rooms);
    };
    const creatRoom = (rooms)=>{
      setRoomList(rooms);
    }
    socket.emit('get-rooms',getRooms);
    socket.on('room-list',creatRoom);
    return () => {
      socket.off('get-rooms',getRooms);
      socket.off('room-list',creatRoom);
    };
  }, []);

  useEffect(() => {
    setIsRoomList(roomList.slice())
  }, [roomList]);

  useEffect(() => {
    if(searchInputValue.length === 0){
      setIsRoomList([...roomList])
    }else {
      const searchRoom = roomList.filter((x) => x.indexOf(searchInputValue) > -1)
      setIsRoomList(searchRoom)
    }
  }, [searchInputValue]);


  const enterRoom = (roomName) =>{
    const pushRoom = () =>{
      navigate(`/room/${roomName}`)
    }
    socket.emit('enter-room',roomName,pushRoom)
  }
  const changeSearchInput = (e) =>{
    setTimeout(() => setSearchInputValue(e.target.value),500)

  }
  const handleReSet = () =>{
    setIsSearchForm(false);
    setIsRoomList([...roomList])
  }
  const clickNewRoomModalClose = () =>{
    setIsNewRoom(false)
  }

  return (
    <>
      <NewRoomModal isNewRoom={isNewRoom} clickClose={clickNewRoomModalClose}></NewRoomModal>
    <section className="search-room-section">
      {
        isSearchForm ?
          (
            <SearchForm>
              <SearchDiv>
                <Input placeholder={'방이름을 입력해주세요.'} _onChange={changeSearchInput}/>
                <div onClick={handleReSet}>
                  <Icons name={'closeIcon'} width={15} propsClassName={"searchIcon"}></Icons>
                </div>
              </SearchDiv>
              {/*<Btn btnType={'submit'} BtnName={"검색"}></Btn>*/}
            </SearchForm>
          ) :
          (
            <div>
              {/*<Btn IconName={'searchIcon'} clickEvent={() => setIsSearchForm(true)}/>*/}
              {/*<Btn IconName={'plusIcon'} clickEvent={()=> setIsNewRoom(true)}/>*/}
              {/*<Btn IconName={'fastForwardIcon'} />*/}
            </div>
          )
      }
    </section>
  <section className="room-list">
    <div className="inner-container">
        { isRoomList.length >=1 ? (
          <ul>
            {isRoomList.map((x,index) => (
                <li key={index}>
                  <div>
                    {x}
                  </div>
                  <div>
                    입장 멤버 수 /  총 멤버 수
                  </div>
                    <button onClick={()=>enterRoom(x)}>입장하기</button>
                </li>
              ))}
          </ul>): <> 아직 만들어진 방이 없어요! 방을 생성해주세요 </>}
    </div>
  </section>
  <div className="paging inner-container">
    <div className="prev">이전</div>
    <ul className="paging-list">
      <li>1</li>
      <li>2</li>
    </ul>
    <div className="next">다음</div>
  </div>
    </>
  )
}


export default DrawingListPage


const SearchForm = styled.form`
  position : relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
 
`
const SearchDiv = styled.div`
  padding: 0 20px;
  border: 0;
  box-shadow: 0 1px 3px rgba(0,0,0,.25);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

const IconBox = styled.div`
  position : absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
`
