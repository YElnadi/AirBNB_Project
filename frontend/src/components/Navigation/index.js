import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModel';
import './Navigation.css';
import {useHistory} from 'react-router-dom' 
import SignupFormModal from '../SignUpFormModel';
import DropDownMenu from './DropDownMenu';
import ReviewsCard from '../Reviews/ReviewsCard';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
         <SignupFormModal/>
         
      </>
    );
  }

  return (
    <div className='container'>
      <div className='navbar'>
        <NavLink exact to="/"><div><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/1200px-Airbnb_Logo_B%C3%A9lo.svg.png' style={{height:30, cursor:'pointer', marginTop:10 }}/></div></NavLink>
        {isLoaded && sessionLinks}
      
      <nav>
      <ul>
        <li >
        {/* <NavLink to = '/spots' className='airbnb--your--home' >Airbnb your home</NavLink> */}
        </li>
      </ul>
      </nav>
      <i class="fa-solid fa-bars" style={{cursor:'pointer', width:30, marginLeft:40}} ></i>
      </div>
    </div>

  );
}

export default Navigation;