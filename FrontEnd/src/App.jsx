
import './App.css'
import Banner from "./components/Banner/Banner.jsx";
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import DrawingListPage from "./pages/DrawingListPage.jsx";
import SettingPage from "./pages/SettingPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import DrawRoomPage from "./pages/DrawRoomPage.jsx";

function App() {

  const LayOut = () =>{
    return (
      <div>
        <Banner/>
        <div className="inner-container">
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
