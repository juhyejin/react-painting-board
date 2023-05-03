import styled from "styled-components";
import Icons from "@/components/Atom/Icons/Icons.jsx";


const RoomCard = ({roomName,onClick}) => {
  return (
    <Card>
      <div>{roomName}</div>
      {/*<div>사람수</div>*/}
      <div onClick={onClick}><Icons name={'caretRightIcon'} width={'25'}></Icons></div>
    </Card>
  )
}


export default RoomCard


const Card = styled.div`
  width: 50%;
  margin: 0 auto;
  border-radius: 8px;
  padding: 10px 20px;
  transition: .4s;
  font-size: 16px;
  border: 1px solid #d1d0d0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div:last-child {
    cursor: pointer;
    color: #93a4ff;
  }

  &:hover {
    box-shadow: inset 0 0 4px 1px rgba(255, 82, 200, .68);
    border-color: rgba(112, 255, 238, .68);
  }
`
