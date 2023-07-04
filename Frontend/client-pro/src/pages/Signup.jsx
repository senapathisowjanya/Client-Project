import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('recruiter');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsFormSubmitted(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsFormSubmitted(false);
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password ||!userType) {
      setIsFormSubmitted(true);
      
      return;
    }

    let obj = {
      email,
      password,
    };

    fetch('http://localhost:8080/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.msg);
       
      })
      .catch((err) => {
        console.log(err.message);
      });

    setEmail('');
    setPassword('');
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="signup-form-container">
        <h1 className="text-center text-gray">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="text"
              value={email}
              onChange={handleEmailChange}
              className={`form-control ${isFormSubmitted && !email ? 'is-invalid' : ''}`}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className={`form-control ${isFormSubmitted && !password ? 'is-invalid' : ''}`}
            />
          </div>
          <div className="form-group">
            <div className="user-type-group">
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  value="recruiter"
                  checked={userType === 'recruiter'}
                  onChange={handleUserTypeChange}
                />
                <label className="form-check-label">Recruiter</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  value="jobseeker"
                  checked={userType === 'jobseeker'}
                  onChange={handleUserTypeChange}
                />
                <label className="form-check-label">Job Seeker</label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="text-center">
              <button type="submit" className="signup-button">
                REGISTER
              </button>
            </div>
          </div>
        </form>
        
      </div>
    </div>
  );
};

export default Signup;
