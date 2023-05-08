import {useNavigate, useParams} from "react-router-dom";
import {socket} from "../server.jsx";
import styled from "styled-components";
import Button from "@/components/Atom/Button/Button.jsx";
import ButtonGroup from "@/components/Molecule/ButtonGroup/ButtonGroup.jsx";
import Icons from "@/components/Atom/Icons/Icons.jsx";
import {useEffect, useRef, useState} from "react";

const DrawRoomPage = () => {
  const { roomName } = useParams();
  const navigate = useNavigate();
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [brushType, setBrushType] = useState('circle');
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState();

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    canvas.width= '500'
    canvas.height = '500'

    context.lineJoin = 'round'
    context.strokeStyle = 'blue'
    context.fillStyle = 'pink'
    setCtx(context);
  }, []);


  const handleClick = () =>{
    socket.emit('leave-room',roomName)
    navigate(-1)
  }

  const BtnGroup = [{
      iconName: 'circleIcon',
      onClick : () =>{
        setBrushType('circle')
      }
    },{
      iconName: 'squareIcon',
      onClick : () =>{
        setBrushType('square')
      }
    },{
      iconName: 'eraserIcon',
      onClick : () =>{
        setBrushType('eraser')
      }
    },{
      iconName: 'paintBucketIcon',
      onClick : () =>{
        setBrushType('paint')
      }
      },{
        iconName: 'paletteIcon',
        onClick : () =>{
          console.log('palette')
        }
      }
  ]

  const handleMouseMove = ({nativeEvent}) => {
    const {offsetX,offsetY} = nativeEvent;

    if(isMouseDown){
      switch (brushType){
        case 'circle':
          ctx.beginPath();
          ctx.arc(offsetX, offsetY,10,0, Math.PI*2);
          ctx.closePath();
          ctx.fill();
          break
        case 'square' :
          ctx.fillRect(offsetX - 10 / 2, offsetY - 10 / 2, 10, 10);
          break
        case 'paint' :
          ctx.fillRect(0,0, 500, 500);
          break
        case 'eraser':
          ctx.clearRect(offsetX - 10/2,offsetY - 10/2, 10, 10);
          break
      }

    }
  }

  const mouseupDown = (val) =>{
    setIsMouseDown(val)
  }
  return (
    <MainContainer>
      <RoomHeader>
        <div>
          {roomName}
        </div>
        <Button btnInner={<Icons name={'exitIcon'}/>} onClick={handleClick}></Button>
      </RoomHeader>
      <DrawContainer>
        <Canvas ref={canvasRef} onMouseMove={handleMouseMove} onMouseDown={()=>mouseupDown(true)} onMouseUp={()=>mouseupDown(false)} onMouseOut={()=>mouseupDown(false)}></Canvas>
        <BrushBox>
          <BrushPreview className={brushType}></BrushPreview>
          <ButtonGroup btnItems={BtnGroup} useActive={true}></ButtonGroup>
        </BrushBox>
      </DrawContainer>
      <ChatContainer>
        메세지
      </ChatContainer>
    </MainContainer>
  )
}

export default DrawRoomPage


const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 90vh;
`
const RoomHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  div:first-child{
    font-size: 20px;
    font-weight: bold;
  }
`
const DrawContainer = styled.div`
  display: flex;
  justify-content:  center;
  gap: 20px;
  align-items: start;
`
const Canvas = styled.canvas`
  border: 1px solid;
`
const BrushBox = styled.div`
  
`
const BrushPreview = styled.div`
  width: 50px;
  height: 50px;
  margin: auto;
  box-sizing: border-box;
  &.circle{
    border-radius: 50%;
    background-color: pink;
  }
  &.square, &.paint{
    background: pink;
  }
  &.eraser{
    border: 1px solid;
  }
`

const ChatContainer = styled.div`
 
`
