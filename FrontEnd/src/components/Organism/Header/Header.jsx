import styled from "styled-components";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import React from "react";

const Header = () => {
  const [currentMenu, setCurrentMenu] = useState(0);
  const [menus, setMenus] = useState([
    {name_kr:'그림방', name_en:'Draw',url:'draw'},
    {name_kr:'설정', name_en:'Setting',url:'setting'}
  ]);
  const navigate = useNavigate()

  const clickMenu = (menu) =>{
    const index = menus.findIndex((x)=> x===menu);
    setCurrentMenu(index)
    navigate(`/${menu.url}`)
  }

  return (
    <HeaderTag>
      <HeaderContents className='inner-container'>
        <Logo>
          Drawing With You
        </Logo>
        <Menus>
          { menus.map((menu,index) => (
            <Menu key={index} className={currentMenu === index ? 'active':''} onClick={()=>clickMenu(menu)}>{menu.name_kr}</Menu>
          ))}
        </Menus>
      </HeaderContents>
    </HeaderTag>
  )
}

export default Header

const HeaderTag = styled.header`
  height: 65px;
  width: 100%;
  position:fixed;
  top:0;
  left:0;
  box-shadow: 0 1px 2px rgba(199,208,255, 1);
`
const HeaderContents = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Logo = styled.div`
  width: auto;
  height: auto;
  white-space: pre;
  font-weight: 400;
  font-style: normal;
  font-family: "Audiowide", serif;
  color: transparent;
  background: linear-gradient(rgba(112,255,238,.68), rgba(255,82,200,.68));
  background-clip: text;
  -webkit-background-clip: text;
  font-size: 25px;
  letter-spacing: 0px;
  line-height: 1.2;
`
const Menus = styled.ul`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: end;
  gap: 20px;
`
const Menu = styled.li`
  padding: 15px 10px;
  cursor: pointer;
  
  &.active{
    background-color: #C7D0FF;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
`
