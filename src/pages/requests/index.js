import React, { useState } from 'react';
import { getCurrentUser } from '../../app/services/userService';
import { useNavigate } from 'react-router-dom';


const Requests = () => {
  const navigate = useNavigate();

  try {
    const currentUser = getCurrentUser();
    return (
      <div>
        <h1>id: {currentUser.id}</h1>
        <h1>nickname: {currentUser.nickname}</h1>
        <h1>email: {currentUser.email}</h1>
        <h1>admin: {currentUser.admin ? 'true' : 'false'}</h1>
      </div>
    );
  } catch (error) {

    navigate('/login', { replace: true });
  }
};

export default Requests;