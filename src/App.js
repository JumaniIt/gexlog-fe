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
    element: <Main />,
    errorElement: <ErrorPage />,
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
    element: <OrderPage />,
  },
  {
    path: "/orders/new",
    element: <OrderPage />,
  },
  {
    path: "/users",
    element: <UsersPage />,
  },
  {
    path: "/users/:id",
    element: <UserPage />,
  },
  {
    path: "/users/new",
    element: <UserPage />,
  },
  {
    path: "/clients",
    element: <ClientsPage />,
  },
  {
    path: "/clients/:id",
    element: <ClientPage />,
  },
  {
    path: "/clients/new",
    element: <ClientPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/profile/:id",
    element: <ProfilePage />,
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
