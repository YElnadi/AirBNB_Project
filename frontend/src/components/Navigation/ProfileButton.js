import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './Navigation.css'

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
      <div >
      <NavLink to ='/'><img 
        src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg"
        alt='Airbnb logo' className='logo'/></NavLink>
        <div class='drop-down'>
        <div className='profile-button'>
      <i className="fa-solid fa-circle-user "  onClick={openMenu} ></i>
      </div>
      {showMenu && (
        <ul className="">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
          <li>
            <NavLink to='/spots'> Create a Spot</NavLink>
          </li>
          <li>
            <NavLink to='/spots/current'>Your Spots</NavLink>
          </li>
        </ul>
        
      )}
        </div>
        </div>

    </>
  );
}

export default ProfileButton;