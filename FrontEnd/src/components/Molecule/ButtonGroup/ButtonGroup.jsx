import styled from "styled-components";
import Button from "@/components/Atom/Button/Button.jsx";
import Icons from "@/components/Atom/Icons/Icons.jsx";
import {useState} from "react";

const ButtonGroup = ({btnItems,variant, useActive}) => {

  const [btnIndex, setBtnIndex] = useState(0);


  const handleClick = (btnInfo)=>{
    if(useActive){
      const activeBtn = btnItems.findIndex((btn)=>btn === btnInfo)
      setBtnIndex(activeBtn);
      btnInfo.onClick()
    }else{
      btnInfo.onClick()
    }
  }

  return (
    <BtnGroupBox>
      {btnItems.map((btnInfo,index)=>(
        <Button key={index}
                btnInner={<Icons name={btnInfo.iconName}/>}
                onClick={()=> handleClick(btnInfo)}
                variant={variant}
                className={index === btnIndex ? 'active' : ''}
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
  padding: 20px;
`
