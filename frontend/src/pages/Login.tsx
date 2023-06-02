import React from 'react';
import EmailTextBox from '../modules/EmailTextBox';
import PasswordTextBox from '../modules/PasswordTextBox';

const Login = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '200px' }}>
      <h1 style={{ textAlign: 'center' }}>Login</h1>
      <EmailTextBox label="Email" />
      <div style={{ marginTop: '8px' }} />
      <PasswordTextBox label="Password" />
      <button type="submit" className="my-2 btn btn-primary" style={{ width: '100%' }}>
        Login
      </button>
      <div style={{ marginTop: '8px', textAlign: 'center' }}>
        <span>Don't have an account? </span>
        <a href="SignUp">Sign Up</a>
      </div>
    </div>
  </div>
);

export default Login;
