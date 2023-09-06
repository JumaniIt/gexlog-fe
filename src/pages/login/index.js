import React from 'react';
import { useNavigate } from 'react-router-dom'
import LoginForm from '../../components/LoginForm/loginForm';
import imageSrc from '../../login-ship.png';

const Login = () => {


  return (
    <div className="login-page">
      <div className="form-section">
        <LoginForm />
      </div>
      <div className="image-section">
        <img src={imageSrc} />
      </div>
    </div>
  );
}

export default Login;
