import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
     
      <ProfileButton user={sessionUser} />
      
      </>
    );
  } else {
    sessionLinks = (
      <div>
  
       <NavLink to ='/'><img 
        src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg"
        alt='Airbnb logo' className='logo'/></NavLink>
       
        <NavLink to="/login" className="nav">Log In</NavLink>
        <NavLink to="/signup" className='nav'>Sign Up</NavLink>
        
      </div>
    );
  }

  return (
    <ul>
      <div >
        <NavLink exact to="/" className='nav'>
          Home
          </NavLink>
        {isLoaded && sessionLinks}
      </div>
    </ul>
  );
}


export default Navigation;
