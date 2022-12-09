import React, { useState } from "react";
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
      <div>

        <form onSubmit={handleSubmit} >
        <h1 style={{textAlign:'center', marginBottom:'20px'}}>Login</h1>

          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div>
            <label>
              Username or Email
              <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <div className='Btn'>
            <button style={{ background: 'rgb(236, 72, 72)', padding: '10px', borderRadius: '10px', fontWeight: '700px' }} type="submit">Log In</button>
            <button style={{ background: 'rgb(236, 72, 72)', padding: '10px', borderRadius: '10px', fontWeight: '700px' }} type="submit" onClick={handleDemo}>Log in as demo user</button>
          </div>

        </form>
      </div>
    </>
  );
}

export default LoginFormModal;