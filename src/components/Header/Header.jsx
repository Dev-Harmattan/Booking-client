import { useState } from 'react';
import './Header.css';
import { BiMenuAltRight } from 'react-icons/bi';
import OutsideClickHandler from 'react-outside-click-handler';

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const getMenuStyles = () => {
    if (document.documentElement.clientWidth <= 800) {
      return {
        right: !toggleMenu && '-100%',
      };
    }
  };
  return (
    <section className="h-wrapper">
      <div className="h-container flexCenter innerWidth paddings">
        <img src="./logo.png" alt="logo" width={100} />
        <OutsideClickHandler onOutsideClick={() => setToggleMenu(false)}>
          <div className="flexCenter h-menu" style={getMenuStyles()}>
            <a href="">Residencies</a>
            <a href="">Our Values</a>
            <a href="">Contact</a>
            <a href="">Get Started</a>
            <button className="button">
              <a href="">Contact</a>
            </button>
          </div>
        </OutsideClickHandler>

        <div className="menu-icon" onClick={() => setToggleMenu(!toggleMenu)}>
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export { Header };
