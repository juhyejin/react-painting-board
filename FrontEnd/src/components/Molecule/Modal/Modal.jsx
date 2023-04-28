import styled from "styled-components";
import Icons from "@/components/Atom/Icons/Icons.jsx";

const Modal = ({children,clickClose}) => {
  return (
    <Overlay>
      <Card>
        <CloseBox onClick={clickClose}>
          <Icons name={'closeIcon'}></Icons>
        </CloseBox>
        {children}
      </Card>
    </Overlay>
  )
}

export default Modal


const Overlay = styled.div`
  background: rgba(0,0,0, .2);
  position: fixed;
  top:0;
  left: 0;
  height: 100%;
  width: 100%;
 `
const Card = styled.div`
  width: fit-content;
  height: fit-content;
  background: #FFF;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 75px);
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
`
const CloseBox = styled.div`
  width: fit-content;
  align-self: end;
  cursor: pointer;
`
