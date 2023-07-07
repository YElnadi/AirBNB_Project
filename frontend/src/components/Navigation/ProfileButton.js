import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useSelector } from "react-redux";


import "./ProfileButton.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { loadMyBookings } from "../../store/bookings";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const { closeModal } = useModal();
  const sessionUser = useSelector(state=>state.session.user)
  //console.log('user' , sessionUser)

  const openMenu = () => {
    if (showMenu) return;
    //console.log(' hello from show menu')
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) {
      //console.log('showMenu', showMenu)
      return;
    }
    const closeMenu = (e) => {
      //if (!ulRef.current.contains(e.target)) {
      setShowMenu(false);
      //}
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.logout());
    history.push("/");
  };

  const toTrips = async(e) =>{
    e.preventDefault();
    history.push(`/bookings/${sessionUser.id}`)

  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  const handleDemo = async (e) => {
    e.preventDefault();
    await dispatch(
      sessionActions.login({ credential: "Ali-G", password: "password" })
    ).then(closeModal);
    return;
  };
  return (
    <>
      <button onClick={openMenu} className="button">
        <i
          className="fa-solid fa-bars "
          style={{ padding: 5, fontSize: 20 }}
        ></i>
        <i
          className="fas fa-user-circle"
          style={{ fontSize: 25, padding: 0 }}
        />
      </button>

      {showMenu && (
        <ul className={ulClassName} ref={ulRef}>
          {user ? (
            <>
              <li>
                <span style={{ fontFamily: "Geneva, Verdana, sans-serif" }}>
                  Hello,{user.username}
                </span>
              </li>
              <li>
                <span style={{ fontFamily: "Geneva, Verdana, sans-serif" }}>
                  {user.email}
                </span>
              </li>

              <li onClick={toTrips}>
                <span style={{
                      fontFamily:"Geneva, Verdana, sans-serif",
                      textDecoration:"none",
                      color:"black",
                      borderBottom: "none"
                    }}>
                 Trips
                </span>
              </li>

              <li onClick={logout}>
                <span
                  style={{
                    border: "none",
                    background: "transparent",
                    fontSize: 16,
                    textIndent: "-5px",
                    fontFamily: "Geneva, Verdana, sans-serif",
                  }}
                >
                  Log Out
                </span>
              </li>
            </>
          ) : (
            <>
              <li style={{ cursor: "pointer" }}>
                <OpenModalMenuItem
                  itemText={
                    <span style={{ fontFamily: "Geneva, Verdana, sans-serif" }}>
                      Log In
                    </span>
                  }
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </li>
              <li
                style={{ cursor: "pointer", borderBotton: "1px silver solid" }}
              >
                <OpenModalMenuItem
                  itemText={
                    <span style={{ fontFamily: "Geneva, Verdana, sans-serif" }}>
                      Sign up
                    </span>
                  }
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </li>
              <li onClick={handleDemo}>
                <span
                  style={{
                    cursor: "pointer",
                    border: "none",
                    background: "transparent",
                    marginBottom: "0px",
                    fontFamily: "Geneva, Verdana, sans-serif",
                    fontSize: 16,
                    textIndent: "-5px",
                  }}
                  type="submit"
                >
                  Log in as demo user
                </span>
              </li>
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;

// import React, { useState, useEffect, useRef } from "react";
// import { useDispatch } from 'react-redux';
// import * as sessionActions from '../../store/session';
// import OpenModalMenuItem from './OpenModalMenuItem';
// import LoginFormModal from '../LoginFormModal';
// import SignupFormModal from '../SignupFormModal';

// function ProfileButton({ user }) {
//   const dispatch = useDispatch();
//   const [showMenu, setShowMenu] = useState(false);
//   const ulRef = useRef();

//   const openMenu = () => {
//     if (showMenu) return;
//     setShowMenu(true);
//   };

//   useEffect(() => {
//     if (!showMenu) return;

//     const closeMenu = (e) => {
//       if (!ulRef.current.contains(e.target)) {
//         setShowMenu(false);
//       }
//     };

//     document.addEventListener('click', closeMenu);

//     return () => document.removeEventListener("click", closeMenu);
//   }, [showMenu]);

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(sessionActions.logout());
//   };

//   const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
//   const closeMenu = () => setShowMenu(false);

//   return (
//     <>
//       <button onClick={openMenu}>
//         <i className="fas fa-user-circle" />
//       </button>
//       <ul className={ulClassName} ref={ulRef}>
//         {user ? (
//           <>
//             <li>{user.username}</li>
//             <li>{user.email}</li>
//             <li>
//               <button onClick={logout} >Log Out</button>
//             </li>
//           </>
//         ) : (
//           <>
//             <li>
//               <OpenModalMenuItem
//                 itemText="Log In"
//                 onItemClick={closeMenu}
//                 modalComponent={<LoginFormModal />}
//               />
//             </li>
//             <li>
//               <OpenModalMenuItem
//                 itemText="Sign Up"
//                 onItemClick={closeMenu}
//                 modalComponent={<SignupFormModal />}
//               />
//             </li>
//           </>
//         )}
//       </ul>
//     </>
//   );
// }

// export default ProfileButton;
