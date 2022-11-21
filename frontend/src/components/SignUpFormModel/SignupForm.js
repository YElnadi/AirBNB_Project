
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage({setShowModal}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({firstName, lastName, email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="center--signup">
      <h1>Signup</h1>
    <form onSubmit={handleSubmit} >
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>

      <div className="text_field">
        <input style={{border:'none'}}
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <span></span>
      <label>Email</label>
      </div>

      <div className="text_field">
        <input style={{border:'none'}}
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <span></span>
      <label>First Name</label>
      </div>

      <div className="text_field">
        <input style={{border:'none'}}
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <span></span>
       <label>Last Name</label>
      </div>

      <div className="text_field">
      
         <input style={{border:'none'}}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
                <span></span>
      <label>Username</label>
      </div>

      <div className="text_field">
        <input style={{border:'none'}}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>Password</label>
      </div>
        <div className="text_field">
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
                <span></span>
        <label>Confirm Password</label>
        </div>

      <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
      <button className="button--signup" style={{margin:20}}type="submit">Sign Up</button>
      </div>
    </form>
    </div>
  );
}

export default SignupFormPage;