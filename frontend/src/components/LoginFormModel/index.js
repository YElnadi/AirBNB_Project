import React, { useState } from 'react';
import  {Modal}  from '../../context/Modal.js';
import LoginForm from './LoginForm';
import{useHistory} from 'react-router-dom'
import '../Navigation/Navigation.css'

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  return (
    <>
      <button onClick={() => 
        {
          setShowModal(true)
          history.push('/')
        } 
        } style={{}}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;