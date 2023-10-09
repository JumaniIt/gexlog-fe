import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Main from "./pages/main/main";
import ErrorPage from "./error-page";
import { OrderProvider } from "./components/context/orderContext";
import { UserProvider } from "./components/context/userContext";
import { ClientProvider } from "./components/context/clientContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
  }
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
