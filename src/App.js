import React from 'react';
import { createBrowserRouter, RouterProvider, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Main from './pages/main/main';
import Requests from './pages/requests';
import ErrorPage from "./error-page";

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
    path: "/requests",
    element: <Requests />,
  },
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
