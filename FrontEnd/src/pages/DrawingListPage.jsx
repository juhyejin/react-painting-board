import Btn from "../components/button/Btn.jsx";
import Input from "../components/input/Input.jsx";
import Icons from "../components/icons/Icons.jsx";
import {useState} from "react";
import styled from "styled-components";
import NewRoom from "../components/NewRoom/NewRoom.jsx";

const DrawingListPage = () => {
  const [count, setCount] = useState(0);
  const [isSearchForm, setIsSearchForm] = useState(false);
  const [isNewRoom, setIsNewRoom] = useState(false);

  const closeNewRoom = () =>{
    setIsNewRoom(false)
  }

  return (
    <>
      <NewRoom newRoom={isNewRoom} closeNewRoom={closeNewRoom}/>
    <section className="search-room-section">
      {
        isSearchForm ?
          (
            <SearchForm>
              <SearchDiv>
                <Input placeholder={'방이름을 입력해주세요.'}/>
                <div onClick={() => setIsSearchForm(false)}>
                  <Icons name={'closeIcon'} width={15} propsClassName={"searchIcon"}></Icons>
                </div>
              </SearchDiv>
              <Btn btnType={'submit'} BtnName={"검색"}></Btn>
            </SearchForm>
          ) :
          (
            <div>
              <Btn IconName={'searchIcon'} clickEvent={() => setIsSearchForm(true)}/>
              <Btn IconName={'plusIcon'} clickEvent={()=> setIsNewRoom(true)}/>
              <Btn IconName={'fastForwardIcon'} />
            </div>
          )
      }
    </section>
  <section className="room-list">
    <div className="inner-container">
      <ul>
        <li>
          방이름
        </li>
        <li>
          입장 멤버 수 /  총 멤버 수
        </li>
        <li>
          <button>입장하기</button>
        </li>
      </ul>
      <ul>
        <li>
          방이름
        </li>
        <li>
          입장 멤버 수 /  총 멤버 수
        </li>
        <li>
          <button>입장하기</button>
        </li>
      </ul>
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
