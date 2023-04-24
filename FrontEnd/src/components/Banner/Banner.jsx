import './Banner.css'
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const Banner = () => {
  const navigate = useNavigate();
  const [currentMenu, setCurrentMenu] = useState(0);
  const menus = [
    {name_kr:'그림방', name_en:'Draw',url:'draw'},
    {name_kr:'설정', name_en:'Setting',url:'setting'}
  ]

  const clickMenu = (menu) => {
    const index = menus.findIndex((x)=> x === menu);
    setCurrentMenu(index);
    navigate(`/${menu.url}`);
  }

  return (
    <header>
      <div className={"nav-container inner-container"}>
        <div className="logo">
          Drawing With You
        </div>
        <div className="menu-items">
          <ul>
            {menus.map((menu,index)=>(
              <li key={index} className={currentMenu === index ? 'active': ''} onClick={()=>clickMenu(menu)}>{menu.name_kr}</li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Banner;

