import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

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
        width: '400px', background: 'white', borderRadius: '10px'
      }}>
        <h1 style={{ textAlign: 'center', padding: '0 0 20px 0', borderBottom: '1px solid silver' }}>Login</h1>

        <form style={{ padding: '0 40px', boxSizing: 'bordar-box' }} onSubmit={handleSubmit} >

          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div style={{ position: 'relative', borderBottom: '2px solid silver', margin: '30px 0' }}>
            <label>
              Username or Email
              <input style={{ width: '100%', padding: '5 5px', height: '40px', fontSize: '16px', border: 'none', background: 'none', outline: 'none' }}
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </label>
          </div>
          <div style={{ position: 'relative', borderBottom: '2px solid silver', margin: '30px 0' }}>
            <label>
              Password
              <input style={{ width: '100%', padding: '5 5px', height: '40px', fontSize: '16px', border: 'none', background: 'none', outline: 'none' }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '10px', gap: '8px' }}>
            <button style={{ background: 'rgb(236, 72, 72)', padding: '10px', borderRadius: '10px', fontWeight: '700px' }} type="submit">Log In</button>
            <button style={{ background: 'rgb(236, 72, 72)', padding: '10px', borderRadius: '10px', fontWeight: '700px' }} type="submit" onClick={handleDemo}>Log in as demo user</button>
          </div>

        </form>
      </div>
    </>
  );
}

export default LoginFormModal;