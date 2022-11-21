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
          <button>
      <i class="fa-solid fa-bars"></i>

      </button>
      </div>
        {state? <div onMouseEnter={showDropdown} >
          <div style={{marginLeft:40, width:100, height:150}}className='dropdown-content'>
            <div style={{paddingBottom:20, paddingTop:20}} ><LoginFormModal /></div>
            <div style={{paddingBottom:20, paddingTop:20}}><SignupFormModal /></div>
          </div>
           

        </div>: null}
      </div>
    
    </div>
  );
}

export default DropDownMenu;
