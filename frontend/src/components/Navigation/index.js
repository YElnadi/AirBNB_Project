import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul style={{display:'flex',justifyContent:'space-between' }}>
      <li style={{listStyle:'none'}}>
        <NavLink exact to="/" style={{textDecoration:'none'}} >Home</NavLink>
      </li>
      {isLoaded && (
        <li style={{listStyle:'none'}}>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
