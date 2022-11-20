import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';
import './SignupForm.css';
import '../Navigation/Navigation.css'

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='container'>
      <div className='navbar'>
      <button className='bar--list' onClick={() => setShowModal(true)} >Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm setShowModal={setShowModal}/>
        </Modal>
      )}
      </div>
    </div>
  );
}

export default SignupFormModal;