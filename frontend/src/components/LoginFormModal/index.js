import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './LoginForm.css'

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          window.alert('Not able to login!' + " " + data.message)
          //if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  // const handleDemo = async (e) => {
  //   e.preventDefault();
  //   await dispatch(sessionActions.login({ credential: 'Ali-G', password: 'password' }))
  //     .then(closeModal)
  //   return
  // }

  return (
    <>
      <div className='main-login-form'>
        <form onSubmit={handleSubmit} >
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <h1 className='login-title'>Login</h1>

          <label className='label-login-form'>
            Username or Email
            <input className="input-login-form"
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>

          <label className='label-login-form'>
            Password
            <input className="input-login-form"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <div className="Btn-login-form">
            <button className='Btn-login-Demo' type="submit">Log In</button>
            {/* <button className='Btn-login-Demo' type="submit" onClick={handleDemo}>Log in as demo user</button> */}
          </div>

        </form>
      </div>
    </>
  );
}

export default LoginFormModal;