import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './ProfileButton.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <div className='container'>
        <button onClick={openMenu} className='button'>
          <i class="fa-solid fa-bars " style={{ padding: 0, fontSize: 20 }}></i>
          <i className="fas fa-user-circle" style={{ fontSize: 25, padding: 5 }} />
        </button>

        <div  className=''>
          <div className={ulClassName} ref={ulRef}>
            {user ? (
              <>
                <div style={{ padding: 10 }} >Hello,{user.username}</div>
                <div style={{ padding: 10 }}>{user.email}</div>
                <div style={{ padding: 10 }}>
                  <button onClick={logout}>Log Out</button>
                </div>
              </>
            ) : (
              <>
                {/* <div style={{ padding: 10, cursor: 'pointer' }}>
                  <OpenModalMenuItem
                    itemText="Log In"
                    onItemClick={closeMenu}
                    modalComponent={<LoginFormModal />}
                  />
                </div>
                <div style={{ padding: 10, cursor: 'pointer' }}>
                  <OpenModalMenuItem
                    itemText="Sign Up"
                    onItemClick={closeMenu}
                    modalComponent={<SignupFormModal />}
                  />
                </div> */}
                </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileButton;