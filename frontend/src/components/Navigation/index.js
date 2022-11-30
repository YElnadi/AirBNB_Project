import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import image from '../../logo/Yasbnb-3.png'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='nav'>
    <ul style={{display:'flex',justifyContent:'space-between'}}>
      <li style={{listStyle:'none'}}>
        <NavLink exact to="/" style={{textDecoration:'none'}} >
          <img src ={image} style={{width:120, marginTop:10, cursor:'pointer'}} alt='logo'/>
        </NavLink>
      </li>
      <li style={{marginTop:10, marginLeft:900, listStyle:'none'}} className='yasbnbBut'><strong>Yasbnb your home</strong></li>
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
