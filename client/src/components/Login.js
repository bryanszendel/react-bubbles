import React, { useState } from "react";
import axios from 'axios';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const onLogin = e => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/login', credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        props.history.push('/bubbles')
      })
  }

  const logout = e => {
    e.preventDefault();
    localStorage.removeItem('token')
    props.history.push('/')
  }
  
  return (
    <div className="centering">
      <div className="form-container">
        <h1>Login Form</h1>
        <form onSubmit={onLogin}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
          />
          <button>Log In</button>
          <button onClick={e => logout(e)}>Log Out</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
