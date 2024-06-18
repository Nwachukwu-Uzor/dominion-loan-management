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

// Requests
const RequestsComponent = lazy(() => import("./requests"));

export const RequestsPage = () => (
  <Suspense fallback={<h2>Loading...</h2>}>
    <RequestsComponent />
  </Suspense>
);

// New Request
const NewRequestComponent = lazy(() => import("./new-request"));
export const NewRequestPage = () => (
  <Suspense fallback={<h2>Loading...</h2>}>
    <NewRequestComponent />
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
