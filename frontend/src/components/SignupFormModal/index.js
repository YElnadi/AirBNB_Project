import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false)
  //const [validationErrors, setValidationErrors] = useState([])

  const { closeModal } = useModal();

  useEffect(() => {
    const err = []
    if (!email) err.push('Please enter an email in oreder to sign up')
    if (!email.includes('@')) err.push('Please provide a valid email address')
    if (!username) err.push('Please enter user name')
    if (username.length <= 4) err.push('Please enter a username not less than  5 characters')
    if (username.includes('@')) err.push('Username cannot be an email')
    if (!firstName) err.push('Please provide first name')
    if (firstName.length <= 2) err.push('Please provide first name not less than 4 characters')
    if (!lastName) err.push('Please provide last name')
    if (lastName.length <= 2) err.push('Please provide last name not less than 4 characters')
    if (!password) err.push('Please enter valid password')
    if (password.length < 6) err.push('Please enter a password that is not less than 6 characters')
    setErrors(err)
  }, [email, username, firstName, lastName, password])

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true)
    // if (errors.length > 0) return alert('Cannot submit')
    if (errors.length > 0) return;
    if (password !== confirmPassword) {
      return setErrors(['Confirm Password field must be the same as the Password field']);
    }
    setErrors([]);
    return dispatch(sessionActions.signup({ email, username, password, firstName, lastName }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        // window.alert('Not able to signup!' + " " + data.message)
        if (data && data.message) setErrors([data.message]);
        else setErrors(["Unknown failure"])
      });
  };

  return (
    <>
      <div className='main-singup-form'>
        <h1 className='form-title'>Sign Up</h1>

        <form className='form-signup' onSubmit={handleSubmit}>
          {hasSubmitted && errors.length > 0 && (
            <div>
              The following errors were found:
              <ul>
                {/* {errors.map((error, idx) => <li key={idx}>{error}</li>)} */}
                {errors.map(error => (<li key={error}>{error}</li>))}
              </ul>
            </div>
          )}
          <div >
            <label className='label-signup'>
             Email
              <input className='input'
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>

          <div >
            <label className='label-signup'>
           Username
              <input  className='input'
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
          </div>

          <div>
            <label className='label-signup'>
            First Name
              <input  className='input'
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
          </div>

          <div >
            <label className='label-signup'>
           Last Name
              <input  className='input'
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
          </div>

          <div>
            <label className='label-signup'>
           Password
              <input  className='input'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>

          <div >
            <label className='label-signup'>
            Confirm Password               
            <input  className='input'
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
          </div>

          <div className='Btn'>
            <button className ='signup-btn' type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignupFormModal;