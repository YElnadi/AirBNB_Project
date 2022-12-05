import React, { useState, useEffect, useRef } from "react";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalMenuItem from './OpenModalMenuItem';
import './Navigation.css';
import image from '../../logo/Yasbnb-3.png'
import CreateSpotModel from '../CreateSpotModel';
 

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);
  const closeMenu = () => setShowMenu(false);



  return (
    <div className='nav'>
    <ul style={{display:'flex',justifyContent:'space-between'}}>
      <li style={{listStyle:'none'}}>
        <NavLink exact to="/" style={{textDecoration:'none'}} >
          <img src ={image} style={{width:120, marginTop:10, cursor:'pointer'}} alt='logo'/>
        </NavLink>
      </li>
      
      <li style={{marginTop:10, marginLeft:900, listStyle:'none',fontWeight:'bold'}} className='yasbnbBut'>
        {/* <NavLink to ='/spots' style={{textDecoration:'none', color:'black', fontWeight:'bold'}}> */}
        <OpenModalMenuItem
                    itemText="Yasbnb your home"
                    onItemClick={closeMenu}
                    modalComponent={<CreateSpotModel />}
                  /> 
       {/* </NavLink> */}
        </li>

      {isLoaded && (
        <li style={{listStyle:'none', marginTop:10}}>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
    </div>
  );
}

export default Navigation;
