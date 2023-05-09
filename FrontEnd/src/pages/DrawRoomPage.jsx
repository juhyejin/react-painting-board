import {useNavigate, useParams} from "react-router-dom";
import {socket} from "../server.jsx";
import styled from "styled-components";
import Button from "@/components/Atom/Button/Button.jsx";
import ButtonGroup from "@/components/Molecule/ButtonGroup/ButtonGroup.jsx";
import Icons from "@/components/Atom/Icons/Icons.jsx";
import {useEffect, useRef, useState} from "react";
import Input from "@/components/Atom/Input/Input.jsx";
import FormInputGroup from "@/components/Molecule/FormInputGroup/FormInputGroup.jsx";
import useForm from "@/hooks/useForm.jsx";

const DrawRoomPage = () => {
  const { roomName } = useParams();
  const navigate = useNavigate();
  const [isMouseDown, setIsMouseDown] = useState(false);
  const canvasRef = useRef(null);

  const{ values, handleChange, handleSubmit } = useForm({
    initValues:{
      message:''
    },
    onSubmit : ()=>{

    }
  })

  const [brushInfo, setBrushInfo] = useState({
    brushSize : 10,
    brushType : 'circle',
    brushColor : '#000'
  });
  useEffect(() => {
    const canvas = canvasRef.current.getContext('2d')

    canvas.lineJoin = 'round'
    canvas.strokeStyle = brushInfo.brushColor
    canvas.fillStyle = brushInfo.brushColor

  }, [brushInfo.brushColor]);
  const outRoom = () =>{
    socket.emit('leave-room',roomName)
    navigate(-1)
  }
  const handleMouseMove = (event) => {
    const {offsetX,offsetY} = event.nativeEvent;

    const canvasContext = canvasRef.current.getContext("2d")

    if(isMouseDown){
      switch (brushInfo.brushType){
        case 'circle':
          canvasContext.beginPath();
          canvasContext.arc(offsetX, offsetY,brushInfo.brushSize/2, 0, Math.PI*2);
          canvasContext.closePath();
          canvasContext.fill();
          break
        case 'square' :
          canvasContext.fillRect(offsetX - brushInfo.brushSize / 2, offsetY - brushInfo.brushSize / 2, brushInfo.brushSize, brushInfo.brushSize);
          break
        case 'paint' :
          canvasContext.fillRect(0,0, 500, 500);
          break
        case 'eraser':
          canvasContext.clearRect(offsetX - brushInfo.brushSize/2,offsetY - brushInfo.brushSize/2, brushInfo.brushSize, brushInfo.brushSize);
          break
      }
    }
  }
  const handelMouseupDown = (val) =>{
    setIsMouseDown(val)
  }
  const changeBrushType = (brushName)=>{
    setBrushInfo((prevState)=>({
      ...prevState,
      brushType: brushName
    }))
  }
  const changeBrushSize = (event) =>{
    setBrushInfo((prevState)=>({
      ...prevState,
      brushSize: event.target.value
    }))
  }
  const changeBrushColor =(event)=>{
    setBrushInfo((prevState)=>({
      ...prevState,
      brushColor: event.target.value
    }))
  }

  const BtnGroup = [{
    name:'circle',
    iconName: 'circleIcon',
    onClick : function () {changeBrushType(this.name)}
  },{
    name:'square',
    iconName: 'squareIcon',
    onClick : function () {changeBrushType(this.name)}
  },{
    name:'eraser',
    iconName: 'eraserIcon',
    onClick : function () {changeBrushType(this.name)}
  },{
    name:'paint',
    iconName: 'paintBucketIcon',
    onClick : function () {changeBrushType(this.name)}
  }]

  return (
    <MainContainer>
      <RoomHeader>
        <div>
          {roomName}
        </div>
        <Button btnInner={<Icons name={'exitIcon'}/>} onClick={outRoom}></Button>
      </RoomHeader>
      <DrawContainer>
        <Canvas width={500} height={500} ref={canvasRef} onMouseMove={handleMouseMove} onMouseDown={()=>handelMouseupDown(true)} onMouseUp={()=>handelMouseupDown(false)} onMouseOut={()=>handelMouseupDown(false)}></Canvas>
        <BrushBox>
          <ButtonGroup btnItems={BtnGroup} useActive={true}></ButtonGroup>
          <Input type='range' name='brushSize' onChange={changeBrushSize} min='1' value={brushInfo.brushSize}></Input>
          {brushInfo.brushSize} <br/>
          <Input type='color' onChange={changeBrushColor}></Input>
        </BrushBox>
      </DrawContainer>
      <ChatContainer>
        <MessageBox>
          <li>메세지</li>
          <li>메세지</li>
          <li>메세지</li>
          <li>메세지</li>
          <li>메세지</li>
          <li>메세지</li>
          <li>메세지</li>
          <li>메세지</li>
          <li>메세지</li>
          <li>메세지</li>
          <li>메세지</li>
          <li>메세지</li>
          <li>메세지</li><li>메세지</li><li>메세지</li><li>메세지</li><li>메세지</li><li>메세지</li><li>메세지</li><li>메세지</li><li>메세지</li><li>메세지</li><li>메세지</li><li>메세지</li>



        </MessageBox>
        <FormInputGroup name='message' onSubmit={handleSubmit} placeholder='메세지를 입력하세요' btnInner='전송'></FormInputGroup>
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
const ChatContainer = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
`
const MessageBox = styled.ul`
  flex-grow: 1;
  overflow: scroll;
  width: 100%;
  
  >li{
    padding:10px 20px;
  }
`
