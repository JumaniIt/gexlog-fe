import React from 'react';
import LoginForm from '../../components/LoginForm/loginForm';
import imageSrc from '../../login-ship.png';

const Login = () => (
  <div className="login-page">
    <div className="form-section">
      <LoginForm />
    </div>
    <div className="image-section">
      <img src={imageSrc} />
    </div>
  </div>
);


export default Login;
