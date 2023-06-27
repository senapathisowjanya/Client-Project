
import React, { useState } from 'react';
import "./Signup.css"

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [userType, setUserType] = useState('recruiter');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };


  const validateForm = () => {
    let isValid = true;

    if (!email.endsWith('@gmail.com')) {
      setEmailError('Please enter a valid Gmail address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!/(?=.*[A-Z])/.test(password)) {
      setPasswordError('At least one uppercase letter is required');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      isValid = false;
    } else if (!/(?=.*\d)/.test(password)) {
      setPasswordError('At least one number is required');
      isValid = false;
    } else if (!/(?=.*[!@#$%^&*])/.test(password)) {
      setPasswordError('At least one symbol is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      
      console.log('Login successful');
      setLoginSuccess(true);
    }
    // let obj={
    //     email,
    //     password
    // }
    // console.log(obj)
  };

  return (
    <div className="signup-form-container">
      <center><h1 className="form1-header">Register</h1></center>
      {loginSuccess && (
      <div className="success-popup">
        <span className="success-icon">&#10003;</span>
        <p>Register Successful!</p>
      </div>
    )}
      <form onSubmit={handleSubmit}>
        <div className="form1-group">
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
            className={emailError ? 'invalid' : ' '}
          />
          {emailError && <p className="error-message">{emailError}</p>}
        </div>
        <div className="form1-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className={passwordError ? 'invalid' : ''}
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>
        <div className="form1-group">
          <div className="user-type-group">
           <div>
           <label>Recruiter</label>
           <input
                type="radio"
                value="recruiter"
                checked={userType === 'recruiter'}
                onChange={handleUserTypeChange}
              />
           </div>
            <div>
            <label>Job Seeker</label>
            <input
                type="radio"
                value="jobseeker"
                checked={userType === 'jobseeker'}
                onChange={handleUserTypeChange}
              />
            </div>
          </div>
        </div>
        <div className="form1-group">
            <center>
          <button type="button" className="signupback-button">BACK</button>
          <button type="submit" className="signup-button">REGISTER</button>
            </center>
        </div>
      </form>
    </div>
  );
};





export default Signup