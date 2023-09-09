import React, { useState } from 'react';
import { getCurrentUser } from '../../app/services/userService';
import { useNavigate } from 'react-router-dom';
import { Divider } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { MdListAlt, MdPeople } from "react-icons/md";
import { Heading } from '@chakra-ui/react'
import FilterTable from '../../components/FilterTable';

const Requests = () => {
  // const navigate = useNavigate();
  const currentUser = getCurrentUser();
  console.log(currentUser, 'currentUser')

  // try {
  //   const currentUser = getCurrentUser();
  //   return (
  //     <div>
  //       <h1>id: {currentUser.id}</h1>
  //       <h1>nickname: {currentUser.nickname}</h1>
  //       <h1>email: {currentUser.email}</h1>
  //       <h1>admin: {currentUser.admin ? 'true' : 'false'}</h1>
  //     </div>
  //   );
  // } catch (error) {
  //   navigate('/login', { replace: true });
  // }

  return (
    <div className="requests-container">
      <div className="requests-left-bar">
        {/* logo */}
        <div className="logo-container"></div>
        <Divider />
        <div className="left-bar-actions">
          <Link to="/requests"><MdListAlt />Solicitudes</Link>
          <Link to="/users"><MdPeople />Usuarios</Link>
        </div>
      </div>
      <div className="requests-main-section">
        <div className="heading-container">
          <Heading as='h4' size='md'>Hola {currentUser?.nickname} :-)</Heading>
        </div>
        <Divider />
        {/* Table */}
        <div className="requests-table">
          <Heading as='h6' size='sm'>Solicitudes</Heading>
        </div>
        <FilterTable />
      </div>
    </div>
  );
};

export default Requests;