import { NavLink } from 'react-router-dom';
import{useSelector} from 'react-redux'
import{useState} from 'react'
import './header.css'
import ProfileButton from '../Navigation/ProfileButton';
const Header = () => {

// const [showForm, setShowForm] = useState(false);
// const sessionUser = useSelector(state => state.session.user);
//     const openForm = ()=>{
//         if(sessionUser){
//             setShowForm(true)
//         }
//     }




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
            <NavLink to ='/spots' style={{textDecoration:'none'}}><p style={{color:'black'}}>Become a host</p></NavLink>
            <i className="fa-solid fa-globe"></i>
            <i className="fa-solid fa-circle-user" ></i>

        </div>
      
    </div>
  );
}

export default Header;
