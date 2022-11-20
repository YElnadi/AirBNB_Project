import { useState } from "react";
const DropDownMenu = () => {
    const [state, setState] = useState(false)
    const showDropdown = () =>{
        setState(true);
    }
    const hideDropdown = () =>{
        setState(false);
    }

  return (
    <div>
      <div className='dropDown' onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
        {state? <ul onMouseEnter={showDropdown} >
            <li>1s Value</li>
            <li>2nd Value</li>
            <li>3rd Value</li>
            <li>4th Value</li>
            <li>5th Value</li>

        </ul>: null}
      </div>
    </div>
  );
}

export default DropDownMenu;
