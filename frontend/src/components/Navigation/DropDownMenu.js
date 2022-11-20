import { useState } from "react";
import LoginFormModal from "../LoginFormModel";
import SignupFormModal from "../SignUpFormModel";
import './Navigation.css'

const DropDownMenu = () => {
    const [state, setState] = useState(false)
    const showDropdown = () =>{
        setState(true);
    }
    const hideDropdown = () =>{
        setState(false);
    }

  return (
    <div style={{marginBottom:20, marginRight:20,border:1, border:'solid' ,border:'black'}}>
      <div style={{position:'absolute'}} onClick={showDropdown} onMouseLeave={hideDropdown}>
        <div className='nav--bar'>
      <i class="fa-solid fa-bars"></i>
      </div>
        {state? <div onMouseEnter={showDropdown} >
          <div className='menu--select'>
            <div style={{paddingBottom:5, paddingTop:20}} ><LoginFormModal /></div>
            <div style={{paddingBottom:5, paddingTop:20}}><SignupFormModal /></div>
          </div>
           

        </div>: null}
      </div>
    
    </div>
  );
}

export default DropDownMenu;
