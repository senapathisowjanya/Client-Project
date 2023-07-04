import React, { useState } from 'react';
import './Login.css';
import backgroundImage from '../Hexagon.jpg';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emptyFields, setEmptyFields] = useState([]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmptyFields(emptyFields.filter((field) => field !== 'email'));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setEmptyFields(emptyFields.filter((field) => field !== 'password'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fieldsToCheck = [];

    if (email === '') {
      fieldsToCheck.push('email');
    }

    if (password === '') {
      fieldsToCheck.push('password');
    }

    setEmptyFields(fieldsToCheck);

    if (fieldsToCheck.length === 0) {
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
        setEmptyFields([]);
      }, 1000);
    }
  };

  return (
    <div
      className="login-most-outer-div"
      style={{ width: '100%', height: '100vh', backgroundImage: `url(${backgroundImage})`, display: 'flex' }}
    >
      <div className="login-form-container" style={{ width: '450px' }}>
        <center>
          <h1 className="form-header">Sign In</h1>
        </center>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className='input'
              style={{ border: emptyFields.includes('email') ? '1px solid red' : '1px solid #ccc'}}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className='input'
              style={{ border: emptyFields.includes('password') ? '1px solid red' : '1px solid #ccc' }}
            />
          </div>
          <div className="form-group">
            <Link style={{ textDecoration: 'none' }}>Forgot password?</Link>
          
              <button type="submit" className="login-button">
                LOGIN
              </button>
           
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
