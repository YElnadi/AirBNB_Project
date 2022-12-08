import React, { useState, useEffect, useRef } from "react";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalMenuItem from './OpenModalMenuItem';
import './Navigation.css';
import image from '../../logo/Yasbnb-3.png'
import CreateSpotModal from '../CreateSpotModal';
 

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
    <div style={{display:'flex',justifyContent:'space-between'}}>
      <div style={{listStyle:'none'}}>
        <NavLink exact to="/" style={{textDecoration:'none'}} id='logo' >
          <img src ={image} style={{width:120, marginTop:10, cursor:'pointer',marginLeft:30}} alt='logo'/>
        </NavLink>
      </div>
      
      <div style={{marginTop:10, marginLeft:900, listStyle:'none',fontWeight:'bold'}} className='yasbnbBut' postion='absolute' id='btn'>
        {/* <NavLink to ='/spots' style={{textDecoration:'none', color:'black', fontWeight:'bold'}}> */}
        <OpenModalMenuItem
                    itemText="Yasbnb your home"
                    onItemClick={closeMenu}
                    modalComponent={<CreateSpotModal />}
                  /> 
       {/* </NavLink> */}
        </div>

      {isLoaded && (
        <div id='profBtn' style={{listStyle:'none', marginTop:10,postion:'absolute'}}>
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </div>
    </div>
  );
}

export default Navigation;
