import {useEffect, useState} from 'react'
import './App.css'
import Logo from './assets/images/Logo.png'
import io from 'socket.io-client'

function App() {
  const [count, setCount] = useState(0);

  const socket = io.connect('http://localhost:3000');

  return (
    <div className="App">
      <header>
        <div className="inner-container">
          <div>
            <img src={Logo} alt="로고"/>
          </div>
          <div>
            <ul>
              <li>그림방</li>
              <li>닉네임 <button type="button">변경</button></li>
            </ul>
          </div>
        </div>
      </header>
      <section className="search-room-section">
        <input type="text" placeholder={"방 이름을 입력해주세요."}/>
        <button type="button">찾기</button>
      </section>
      <section className="room-list">
        <div className="inner-container">
          <ul>
            <li>
               방이름
            </li>
            <li>
              입장 멤버 수 /  총 멤버 수
            </li>
            <li>
              <button>입장하기</button>
            </li>
          </ul>
          <ul>
            <li>
              방이름
            </li>
            <li>
              입장 멤버 수 /  총 멤버 수
            </li>
            <li>
              <button>입장하기</button>
            </li>
          </ul>
        </div>
      </section>
      <div className="paging inner-container">
        <div className="prev">이전</div>
        <ul className="paging-list">
          <li>1</li>
          <li>2</li>
        </ul>
        <div className="next">다음</div>
      </div>
    </div>
  )
}

export default App
