
import './App.css'
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import DrawingListPage from "./pages/DrawingListPage.jsx";
import SettingPage from "./pages/SettingPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import DrawRoomPage from "./pages/DrawRoomPage.jsx";
import Header from "@/components/Organism/Header/Header.jsx";
import {useEffect, useState} from "react";
import {socket} from "@/server.jsx";

function App() {

  // const [nickName, setNickName] = useState('');

  useEffect(() => {
    socket.on('random-nick',(nickName)=>{
      // setNickName(nickName)
      localStorage.setItem('userNickName',nickName)
    });

    return () => {
      socket.off('random-nick')
    };
  }, []);


  const LayOut = () =>{
    return (
      <div>
        <Header/>
        <div className="inner-container contents">
          <Outlet />
        </div>
      </div>
    )
  }

  return (
    <div className="App">
        <Routes>
          <Route path={"/"} element={<LayOut/>}>
            <Route path="draw" element={<DrawingListPage/>}></Route>
            <Route path={`/room/:roomName`} element={<DrawRoomPage/>}></Route>
            <Route path={"setting"} element={<SettingPage/>}></Route>
            <Route path="*" element={<NotFoundPage/>}></Route>
          </Route>
        </Routes>
    </div>
  )
}

export default App
