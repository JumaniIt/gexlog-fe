// import React, { useState } from 'react';
// import { Divider } from '@chakra-ui/react';
// import { Link } from "react-router-dom";
// import { MdListAlt, MdPeople } from "react-icons/md";
// import { Heading } from '@chakra-ui/react'
// import FilterTable from '../../components/FilterTable';
// import UsersPage from '../users';

// const DefaultAdmin = ({ currentPage }) => {
//   return (
//     <div className="requests-container">
//       <div className="requests-left-bar">
//         {/* logo */}
//         <div className="logo-container"></div>
//         <Divider />
//         <div className="left-bar-actions">
//           <Link to="/requests"><MdListAlt />Solicitudes</Link>
//           <Link to="/users"><MdPeople />Usuarios</Link>
//         </div>
//       </div>
//       <div className="requests-main-section">
//         <div className="heading-container">
//           <Heading as='h4' size='md'>Hola {currentUser?.nickname} :-)</Heading>
//         </div>
//         <Divider />
//         {/* Table */}
//         <div className="requests-table">
//           <Heading as='h6' size='sm'>Solicitudes</Heading>
//         </div>
//         {currentPage === "requests" && <FilterTable />}
//         {currentPage === "users" && <UsersPage />}
//       </div>
//     </div>
//   );
// };

// export default DefaultAdmin;