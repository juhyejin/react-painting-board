
import './App.css'
import io from 'socket.io-client'
import Banner from "./components/Banner/Banner.jsx";
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import DrawingListPage from "./pages/DrawingListPage.jsx";
import SettingPage from "./pages/SettingPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function App() {
  const socket = io.connect('http://localhost:3000');
  console.log(socket);
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
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<LayOut/>}>
            <Route path="draw" element={<DrawingListPage/>}></Route>
            <Route path={"setting"} element={<SettingPage/>}></Route>
            <Route path="*" element={<NotFoundPage/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
