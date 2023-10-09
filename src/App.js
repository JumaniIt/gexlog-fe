import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./pages/login";
import Main from "./pages/main/main";
import Requests from "./pages/requests";
import ErrorPage from "./error-page";
import Order from "./pages/order";
import UsersPage from "./pages/users";
import UserPage from "./pages/user";
import ClientsPage from "./pages/clients";
import ClientPage from "./pages/client";
import ProfilePage from "./pages/profile";
import OrderPage from "./pages/orderPage";
import { OrderProvider } from "./components/context/orderContext";
import { UserProvider } from "./components/context/userContext";
import { ClientProvider } from "./components/context/clientContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/orders",
    element: <Requests />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/orders/:id",
    element: <OrderPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/orders/new",
    element: <OrderPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/users",
    element: <UsersPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/users/:id",
    element: <UserPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/users/new",
    element: <UserPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/clients",
    element: <ClientsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/clients/:id",
    element: <ClientPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/clients/new",
    element: <ClientPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile/:id",
    element: <ProfilePage />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <React.StrictMode>
      <OrderProvider>
        <UserProvider>
          <ClientProvider>
            <RouterProvider router={router} />
          </ClientProvider>
        </UserProvider>
      </OrderProvider>
    </React.StrictMode>
  );
}

export default App;
