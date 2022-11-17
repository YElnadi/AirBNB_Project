import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="signupFrm">
    <form  className='form' onSubmit={handleSubmit}>
    <h1 className="title">Sign up</h1>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>

      <div className="inputContainer">
      <label className="label">
        Email
        <input className="input"
          type="text" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
         
        />
      </label>
      </div>

      <div className="inputContainer">
      <label className="label">
        Username
        <input className='input'
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Username"
        />
      </label>
      </div>

      <div className="inputContainer">
      <label className="label">
        Password
        <input className='input'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"

        />
      </label>
      </div>

      <div className="inputContainer">
      <label className="label">
        Confirm Password
        <input className='input'
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="Confirm Password"

        />
      </label>
      </div>

      <button type="submit" className="">Sign Up</button>
    </form>
    </div>
  );
}

export default SignupFormPage;