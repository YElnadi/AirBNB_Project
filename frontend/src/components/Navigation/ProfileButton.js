import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button onClick={openMenu} style={{ position: 'absolute', right: 80, top: 20, padding: 1, borderRadius: 30, marginBottom: 40 }} >
        <i class="fa-solid fa-bars" style={{ margin: 10 }}></i>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <div style={{ margin: 20 }}>
          <div className='dropdown-content' style={{ position: "absolute", right: 30, top: 50 }}>
            <div >Hello, {user.username}</div>
            <div >{user.email}</div>
            <div>
              <button style={{ cursor: "pointer" }} onClick={logout}>Log Out</button>
            </div>
            <div>
              <NavLink to='/spots/current' style={{ textDecoration: 'none', color: 'black' }}> Your Spots</NavLink>
            </div>
            <div>
              <NavLink to='/spots' style={{ textDecoration: 'none', color: 'black' }}>Airbnb Your home</NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;