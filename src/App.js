import React from 'react';
import { createBrowserRouter, RouterProvider, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Main from './pages/main/main';
import Requests from './pages/requests';
import ErrorPage from "./error-page";
import Order from './pages/order';
import UsersPage from './pages/users';
import UserPage from './pages/user';
import ClientsPage from './pages/clients';
import ClientPage from './pages/client';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/orders",
    element: <Requests />,
  },
  {
    path: "/orders/:id",
    element: <Order />,
  },
  {
    path: "/orders/new",
    element: <Order />,
  },
  {
    path:"/users",
    element: <UsersPage />
  },
  {
    path: "/users/:id",
    element: <UserPage />,
  },
  {
    path: "/users/new",
    element: <UserPage />
  },
  {
    path:"/clients",
    element: <ClientsPage />
  },
  {
    path:"/clients/:id",
    element: <ClientPage />
  },
  {
    path:"/clients/new",
    element: <ClientPage />
  }
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
