import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css'

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }
  const handleDemo = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.login({ credential: 'FakeUser4', password: 'password4' }))
    return
  }
  return (

    <>
      
      <div className='center'>
      <h1 >Login</h1>
      <form onSubmit={handleSubmit} >
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div className='txt_field'>
          <input style={{border:'none', outline:'none', background:'none'}}
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
          <span></span>
          <label>Username or Email</label>
        </div>

        <div className='txt_field'>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span></span>
          <label>Password</label>
        </div>
        <div style={{display:'flex', flexDirection:'column' ,padding:20, margin:20}}>
        
          <button style={{padding:5, margin:10, borderRadius:25, background:'red'}}type="submit">LogIn</button>
          <button  style={{padding:5, margin:10, borderRadius:25, background:'red'}} type="submit" onClick={handleDemo}>Demo User</button>
       
        </div>
      </form>
      </div>
    </>

  );
}

export default LoginForm;