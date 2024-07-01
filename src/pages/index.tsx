import { lazy, Suspense } from "react";

// Auth
const AdminSignUpComponent = lazy(() => import("./admin-sign-up"));
export const AdminSignUpPage = () => (
  <Suspense fallback={<h2>Loading...</h2>}>
    <AdminSignUpComponent />
  </Suspense>
);

const AdminLoginComponent = lazy(() => import("./admin-login"));
export const AdminLoginPage = () => (
  <Suspense fallback={<h2>Loading...</h2>}>
    <AdminLoginComponent />
  </Suspense>
);

// Dashboard
const DashboardComponent = lazy(() => import("./dashboard"));
export const DashboardPage = () => (
  <Suspense fallback={<h2>Loading...</h2>}>
    <DashboardComponent />
  </Suspense>
);

// Bulk Notifications
const BulkNotificationsComponent = lazy(() => import("./bulk-notifications"));

export const BulkNotificationsPage = () => (
  <Suspense fallback={<h2>Loading...</h2>}>
    <BulkNotificationsComponent />
  </Suspense>
);

// New Bulk Notification
const NewBulkNotificationComponent = lazy(
  () => import("./new-bulk-notification")
);
export const NewBulkNotificationPage = () => (
  <Suspense fallback={<h2>Loading...</h2>}>
    <NewBulkNotificationComponent />
  </Suspense>
);

// Single Request
const SingleRequestComponent = lazy(() => import("./single-request"));

export const SingleRequestPage = () => (
  <Suspense fallback={<h2>Loading...</h2>}>
    <SingleRequestComponent />
  </Suspense>
);

// Admin

const AdminComponent = lazy(() => import("./admins"));
export const AdminPage = () => (
  <Suspense fallback={<h2>Loading...</h2>}>
    <AdminComponent />
  </Suspense>
);

// Accounts
const AccountsComponent = lazy(() => import("./accounts"));
export const AccountsPage = () => (
  <Suspense fallback={<h2>Loading...</h2>}>
    <AccountsComponent />
  </Suspense>
);
