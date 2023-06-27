
import React, { useState } from 'react';
import "./Login.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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
    let obj={
      email,
      password
  }

    if (validateForm()) {

      fetch("http://localhost:8080/user/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then((res) => res.json())
        .then((data) => {
          console.log(data.msg)
          if(data.msg==="Login Success"){
            toast.success(data.msg, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
          }else{
            toast.warn(data.msg, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
          }
        })
        .catch((err) => {
         
          console.log(err.message)
        })


    }
    setTimeout(()=>{
      setEmail("")
      setPassword("")
    },1000)

    
    
  };

  return (
    <div className="login-form-container">
      <center><h1 className="form-header">Sign In</h1></center>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className={emailError ? 'invalid' : ' '}
          />
          {emailError && <p className="error-message">{emailError}</p>}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className={passwordError ? 'invalid' : ''}
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>
        <div className="form-group">
            <center>
          <button type="button" className="back-button">BACK</button>
          <button type="submit" className="login-button">LOGIN</button>
            </center>
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
  );
};



export default Login