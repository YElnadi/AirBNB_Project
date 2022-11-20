import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './Navigation.css'
import {useHistory} from 'react-router-dom'

function ProfileButton({ user }) {
  const history = useHistory();
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
    history.push('/')
  };

  return (
    <>
      <div >
      
        <div class='drop-down'>
        <div className='profile-button  navbar' >
      <i className="fa-solid fa-circle-user" 
      onClick={openMenu}></i>
      </div>
      {showMenu && (
        <div style={{position:'absolute', backgroundColor:'white'}}>
          <div>Hello, {user.username}</div>
          <div>{user.email}</div>
          <div>
            <button onClick={logout}>Log Out</button>
          </div>

          <div>
            <NavLink to='/spots/current'>Your Spots</NavLink>
          </div>
          <div>
            <NavLink to='/spots'>Airbnb your home</NavLink>
          </div>
        </div>
        
      )}
        </div>
        </div>

    </>
  );
}

export default ProfileButton;