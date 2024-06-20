import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  DashboardPage,
  AdminLoginPage,
  AdminSignUpPage,
  RequestsPage,
  NewRequestPage,
  SingleRequestPage,
  AdminPage,
} from "./pages";
import { AuthLayout, MainLayout } from "./layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "/bulk-notifications",
        children: [
          {
            index: true,
            element: <RequestsPage />,
          },
          {
            path: "new",
            element: <NewRequestPage />,
          },
          {
            path: ":id",
            element: <SingleRequestPage />,
          },
        ],
      },
      {
        path: "users",
        element: <AdminPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "signup",
        element: <AdminSignUpPage />,
      },
      {
        path: "login",
        element: <AdminLoginPage />,
      },
    ],
  },
]);
const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
