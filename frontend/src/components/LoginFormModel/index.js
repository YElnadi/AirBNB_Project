import React, { useState } from 'react';
import  {Modal}  from '../../context/Modal.js';
import LoginForm from './LoginForm';
import{useHistory} from 'react-router-dom'
import '../Navigation/Navigation.css'

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  return (
    <div className='conatiner'>
      <div className='navbar'>
        <div >
      <button className='bar--list'onClick={() => 
        {
          setShowModal(true)
          history.push('/')
        } 
        } >Log In</button>
        </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
      </div>
    </div>
  );
}

export default LoginFormModal;