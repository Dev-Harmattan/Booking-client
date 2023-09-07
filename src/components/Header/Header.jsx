import { useState } from 'react';
import './Header.css';
import { BiMenuAltRight } from 'react-icons/bi';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link, NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { MenuProfile } from '../MenuProfile/MenuProfile';

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

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
        <Link to="/">
          <img src="./logo.png" alt="logo" width={100} />
        </Link>
        <OutsideClickHandler onOutsideClick={() => setToggleMenu(false)}>
          <div className="flexCenter h-menu" style={getMenuStyles()}>
            <NavLink to="/properties">Properties</NavLink>
            <a href="">Contact</a>

            {!isAuthenticated ? (
              <button className="button" onClick={loginWithRedirect}>
                Login
              </button>
            ) : (
              <MenuProfile user={user} logout={logout} />
            )}
          </div>
        </OutsideClickHandler>

        <div
          className="menu-icon"
          onClick={() => setToggleMenu((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export { Header };
