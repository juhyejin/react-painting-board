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
  const canvasRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const [messageData, setMessageData] = useState([{
    className: 'system',
    msg: '입장하였습니다.'
  }]);

  const [brushInfo, setBrushInfo] = useState({
    my_brush: {
      brushSize : 10,
      brushType: 'circle',
      brushColor : '#000',
      offsetY: 0,
      offsetX: 0
    }
  });

  useEffect(() => {
    socket.on('other-draw',(brushInfo)=>{
      draw(brushInfo)
    })
    return () => {
      socket.on('other-draw',(brushInfo)=>{
        draw(brushInfo)
      })
    };
  }, []);

  const{ values, handleChange, handleSubmit } = useForm({
    initValues:{},
    onSubmit : ()=>{
      setMessageData((prevState)=>[...prevState,{
      className: 'me',
      msg : `${values.message}`
    }])
      socket.emit('new-message',roomName, values.message);
    }
  })

  useEffect(() => {
    const addMessage = (className,msg) =>{
      setMessageData((prevState)=>[...prevState,{
        className: className,
        msg : `${msg}`
      }])
    }
    socket.on('new-message',(nickName,className,msg)=>{
      addMessage(nickName,className,msg)
    })
    return () => {
      socket.off('new-message',(nickName,className,msg)=>{
        addMessage(nickName,className,msg)
      })
    };
  }, []);
  const outRoom = () =>{
    socket.emit('leave-room',roomName)
    navigate(-1)
  }
  const draw = (brushInfo) => {
    const canvasContext = canvasRef.current.getContext("2d")
      canvasContext.lineJoin = 'round'
      canvasContext.strokeStyle = brushInfo.brushColor
      canvasContext.fillStyle = brushInfo.brushColor
      switch (brushInfo.brushType){
        case 'circle':
          canvasContext.beginPath();
          canvasContext.arc(brushInfo.offsetX, brushInfo.offsetY,brushInfo.brushSize/2, 0, Math.PI*2);
          canvasContext.closePath();
          canvasContext.fill();
          break
        case 'square' :
          canvasContext.fillRect(brushInfo.offsetX - brushInfo.brushSize / 2, brushInfo.offsetY - brushInfo.brushSize / 2, brushInfo.brushSize, brushInfo.brushSize);
          break
        case 'paint' :
          canvasContext.fillRect(0,0, 500, 500);
          break
        case 'eraser':
          canvasContext.clearRect(brushInfo.offsetX - brushInfo.brushSize/2,brushInfo.offsetY - brushInfo.brushSize/2, brushInfo.brushSize, brushInfo.brushSize);
          break
    }
  }

  const changeBrushInfo = (brushInfoName,brushValue) =>{
    setBrushInfo((prevState)=> (
      {...prevState, my_brush:{...prevState.my_brush,[brushInfoName]:brushValue}}
    ))
  }
  const handleMouseMove = (event) => {
    const {offsetX,offsetY} = event.nativeEvent;
    changeBrushInfo('offsetX',offsetX);
    changeBrushInfo('offsetY',offsetY);
    if(isMouseDown){
      draw(brushInfo.my_brush)
      socket.emit('other-draw',roomName,brushInfo.my_brush)
    }
  }

  const handelMouseupDown = (val) =>{
    setIsMouseDown(val)
    socket.emit('brush-info',roomName,brushInfo)
  }

  const changeBrushType = (brushName)=>{
    changeBrushInfo('brushType',brushName)
  }

  const changeBrushSize = (event) =>{
    changeBrushInfo('brushSize',event.target.value)
  }

  const changeBrushColor =(event)=>{
    changeBrushInfo('brushColor',event.target.value)
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
          <ButtonGroup activeBtn={0} btnItems={BtnGroup} useActive={true}></ButtonGroup>
          <Input type='range' name='brushSize' onChange={changeBrushSize} min='1' value={brushInfo.my_brush.brushSize}></Input>
          {brushInfo.my_brush.brushSize} <br/>
          <Input type='color' onChange={changeBrushColor}></Input>
        </BrushBox>
      </DrawContainer>
      <ChatContainer>
        <MessageBox>
          {messageData.map((x,index)=>
            <Message key={index} className={x.className}>{x.msg}</Message>
          )}
        </MessageBox>
        <FormInputGroup name='message' onSubmit={handleSubmit} onChange={handleChange} placeholder='메세지를 입력하세요' btnInner='전송'></FormInputGroup>
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
    margin-top: 5px;
    margin-bottom: 5px;
  
    max-width: 300px;
    width: fit-content;
    border-radius: 20px;
    word-break: keep-all;
    word-wrap: break-word;
  }
`
const Message = styled.li`
  &.system {
    background: #e8e8e8;
    margin-left: auto;
    margin-right: auto;
    font-size: 14px;
    text-align: center;
  }

  &.me {
    background: #c8e4ff;
    margin-left: auto;
    margin-right: 10px;
  }

  &.other {
    background: pink;
    margin-left: 10px;
  }
`
