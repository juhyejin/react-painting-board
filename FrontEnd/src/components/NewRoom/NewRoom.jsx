import styled from "styled-components";
import Input from "../input/Input.jsx";
import Icons from "../icons/Icons.jsx";
import Btn from "../button/Btn.jsx";
import {useEffect, useState} from "react";

const NewRoom = ({newRoom,closeNewRoom }) => {


  return (
    <>
    {newRoom &&  (
      <Overlay>
        <Card>
          <form>
            <Input placeholder={'방이름을 입력해주세요.'}/>
            <div onClick={closeNewRoom}>
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
