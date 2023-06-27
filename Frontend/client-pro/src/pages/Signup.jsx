import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css'; // Import Bootstrap CSS

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
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
    let obj = {
      email,
      password,
    };

    if (validateForm()) {
      fetch('http://localhost:8080/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.msg);
          if (data.msg === 'User Successfully Registered') {
            toast.success(data.msg, {
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark',
            });
          } else {
            toast.warn(data.msg, {
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark',
            });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    setTimeout(() => {
      setEmail('');
      setPassword('');
    }, 1000);
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="signup-form-container border p-4 custom-width">
        <h1 className="text-center text-gray">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="text"
              value={email}
              onChange={handleEmailChange}
              className={`form-control ${emailError ? 'is-invalid' : ''}`}
            />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className={`form-control ${passwordError ? 'is-invalid' : ''}`}
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
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
              <button type="submit" className="btn btn-primary bg-success text-white">
                REGISTER
              </button>
            </div>
          </div>
        </form>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </div>
  );
};

export default Signup;
