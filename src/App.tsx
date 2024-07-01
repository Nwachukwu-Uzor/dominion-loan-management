import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  DashboardPage,
  AdminLoginPage,
  AdminSignUpPage,
  BulkNotificationsPage,
  NewBulkNotificationPage,
  SingleRequestPage,
  AdminPage,
  AccountsPage,
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
        path: "/accounts",
        element: <AccountsPage />,
      },
      {
        path: "/bulk-notifications",
        children: [
          {
            index: true,
            element: <BulkNotificationsPage />,
          },
          {
            path: "new",
            element: <NewBulkNotificationPage />,
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
