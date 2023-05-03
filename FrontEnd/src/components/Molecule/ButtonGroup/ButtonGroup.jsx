import styled from "styled-components";
import Button from "@/components/Atom/Button/Button.jsx";
import Icons from "@/components/Atom/Icons/Icons.jsx";

const ButtonGroup = ({btnItems}) => {

  return (
    <BtnGroupBox>
      {btnItems.map((btnInfo,index)=>(
        <Button key={index}
                btnInner={<Icons name={btnInfo.iconName}/>}
                onClick={btnInfo.onClick}
                variant='active'
        >
        </Button>
      ))}
    </BtnGroupBox>
  )
}

export default ButtonGroup

const BtnGroupBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3 , 1fr);
  gap: 10px;
  max-width: 20%;
  margin: 0 auto;
  padding: 20px;
`
