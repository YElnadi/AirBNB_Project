import React from 'react';
import './header.css'
const Header = () => {
  return (
    <div className='header'>
        <img className='header__icon'
        src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg"
        alt='Airbnb logo'
    
        />

        <div className='header__center'>
            <input type='text'/>
            <i className="fa-solid fa-magnifying-glass"></i>

        </div>

        <div className='header__right'>
            <p>Become a host</p>
            <i className="fa-solid fa-globe"></i>
            <i className="fa-solid fa-circle-user"></i>

        </div>
      
    </div>
  );
}

export default Header;
