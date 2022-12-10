import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import '../CreateSpotModal/CreateSpotModal.css'

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

  const handleDemo = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.login({ credential: 'FakeUser4', password: 'password4' }))
      .then(closeModal)
    return
  }

  return (
    <>
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '400px', background: 'white', borderRadius: '10px', padding: '30px'
      }}>


        <form onSubmit={handleSubmit} >
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>

          <h1 style={{ textAlign: 'center', padding: '0 0 20px 0', borderBottom: '1px solid silver',fontFamily:'Geneva, Verdana, sans-serif' }}>Login</h1>

          <label className='label'>
            <spam style={{fontFamily:'Geneva, Verdana, sans-serif'}}>Username or Email</spam>
            <input className="input"
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>

          <label className='label'>
            <spam style={{fontFamily:'Geneva, Verdana, sans-serif'}}>Password</spam>
            <input className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <div className="Btn">
            <button style={{ background: 'rgb(236, 72, 72)', padding: '10px', borderRadius: '15px', fontWeight: '700px', width: '98%',fontFamily:'Geneva, Verdana, sans-serif' }} type="submit">Log In</button>
            <button style={{ background: 'rgb(236, 72, 72)', padding: '10px', borderRadius: '15px', width: '98%', fontWeight: '700', fontFamily:'Geneva, Verdana, sans-serif' }} type="submit" onClick={handleDemo}>Log in as demo user</button>
          </div>

        </form>
      </div>
    </>
  );
}

export default LoginFormModal;