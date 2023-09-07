import { useState } from 'react';
import './Header.css';
import { BiMenuAltRight } from 'react-icons/bi';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link, NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { MenuProfile } from '../MenuProfile/MenuProfile';
import { useAuthCheck } from '../../hooks/useAuthCheck';
import { AddPropertyModal } from '../AddPropertyModal/AddPropertyModal';

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
  const { validateLogin } = useAuthCheck();

  const handleAddPropertyClick = () => {
    if (validateLogin()) {
      setModalOpened(true);
    }
  };

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
            <a href="mailto:ganiyusodiq@gmail.com">Contact</a>

            <div onClick={handleAddPropertyClick}>Add Property</div>
            <AddPropertyModal opened={modalOpened} setOpened={setModalOpened} />

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
