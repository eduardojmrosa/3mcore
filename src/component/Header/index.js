import React, { useState, useContext } from 'react';
import { FaBars } from 'react-icons/fa';
import { MdAccountCircle } from 'react-icons/md';

import { Link } from 'react-router-dom';

// ASSETS
import Logo from '../../assets/logo.png';

// STYLE
import './style.css';

// FIREBASE
import fb from '../../config/firebase';
import { getAuth, signOut } from 'firebase/auth';

// CONTEXT API
import { UserContext } from '../../contexts/UserContext';

function Header() {

  // CONTEXT API
  const { user, nameUser } = useContext(UserContext);

  // FIREBASE
  const auth = getAuth(fb);

  if (user.email == null) {
    window.location.href = "/";
  }

  // LOGOUT
  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (error) {

    }
  };

  const [menuUser, setMenuUser] = useState(false);
  const [navbar, setNavbar] = useState(false);

  const showMenuUser = () => {
    setMenuUser(!menuUser);
  };

  const showNavbar = () => {
    setNavbar(!navbar);
  };

  return (
    <header className="header-container">
      <div className="menu" onClick={showNavbar}>
        <FaBars className="fa-bars" />
      </div>
      <div className="title">
        <img src={Logo} alt="Feevin" />
        <h3>SuiteFlow</h3>
      </div>
      <div className="user" onClick={showMenuUser}>
        {/*<FaBell className="fa-bell" />*/}
        <MdAccountCircle className="user-icon" />
      </div>
      {menuUser && (
        <div className="modal-user-container" onClick={showMenuUser}>
          <div className="modal-user">
            <div className="user-info">
              <MdAccountCircle className="icon" />
              <label className="email-user">{user.email}</label>
              <div className="total-price">
                <label></label>
                <label className="price"></label>
              </div>
            </div>
            <button className="btn-sair" onClick={handleLogout}>
              <p className="title">Sair</p>
            </button>
          </div>
        </div>
      )}

      {navbar && (
        <div className="navbar-modal" onClick={showNavbar}>
          <nav className="navbar">
            <div>
              <h3 className="navbar-title">Menu</h3>
              <Link to='/home' className='link'>
                <button className="btn-Dashboard">Pipeline</button>
              </Link>
              <Link to='/dashboard' className='link'>
                <button className="btn-Dashboard">Deshboard</button>
              </Link>

              {nameUser == 'Adm Bazze PVC' ?
                <Link to='/users' className='link'>
                  <button className="btn-Dashboard">Participantes</button>
                </Link>
                : <></>}
            </div>
            {nameUser == 'Adm Bazze PVC' ?
              <div className='area-adm'>
                <Link to='/admin' className='link'>
                  <button className="btn-Dashboard">Administrador</button>
                </Link>
              </div>
              : <></>}

          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
