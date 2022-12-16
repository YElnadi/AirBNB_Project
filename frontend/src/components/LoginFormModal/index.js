import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './LoginForm.css'
import '../Common/FormCommon.css'

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
          // window.alert('Not able to login!' + " " + data.message)
          if (data && data.message) setErrors([data.message]);
          else setErrors(["Unknown failure"])
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
      <div className='yasbnb-modal-main-div'>
        <form className='yasbnb-form' style={{
          height: '340px'
        }} onSubmit={handleSubmit} >

          <h1 className='yasbnb-form-title'>Login</h1>
          <h2 style={{ fontFamily: 'Geneva, Verdana, sans-serif' }}>Welcome to Yasbnb</h2>
          {errors.length > 0 && (
            <div>
              <span style={{ fontFamily: 'Geneva, Verdana, sans-serif' }}>The following errors were found:</span>
              <ul style={{ fontFamily: 'Geneva, Verdana, sans-serif' }}>
                {/* {errors.map((error, idx) => <li key={idx}>{error}</li>)} */}
                {errors.map(error => (<li key={error}>{error}</li>))}
              </ul>
            </div>
          )}

          <div className="yasbnb-inputs-div">
            <div>
              <input className="yasbnb-input"
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                placeholder='Username or Email'
                required
              />
            </div>


            <div>
              <input className="yasbnb-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                required
              />
            </div>
          </div>
          <div className="yasbnb-btns-div">
            <button className='yasbnb-btn' type="submit">Continue</button>
            {/* <button className='Btn-login-Demo' type="submit" onClick={handleDemo}>Log in as demo user</button> */}
          </div>

        </form>
      </div>
    </>
  );
}

export default LoginFormModal;