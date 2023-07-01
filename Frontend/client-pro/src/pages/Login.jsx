import React, { useState } from 'react';
import './Login.css';
import backgroundImage from '../Hexagon.jpg';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = {
      email,
      password,
    };

    fetch('http://localhost:8080/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.msg);
        alert('Login Success');
      })
      .catch((err) => {
        console.log(err.message);
      });

    setTimeout(() => {
      setEmail('');
      setPassword('');
    }, 1000);
  };

  return (
    <div className='login-most-outer-div' style={{width:"100%",height:"100vh",border:"2px solid red",backgroundImage: `url(${backgroundImage})`}}>
    <div
      className="login-form-container"
    //  style={{ backgroundImage: `url(${backgroundImage})` }} // Set SVG as background image
    >
      <center>
        <h1 className="form-header">Sign In</h1>
      </center>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div className="form-group">
          <center>
            <button type="submit" className="login-button">
              LOGIN
            </button>
          </center>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Login;
