import { Outlet } from "react-router-dom";
import logo from "@/assets/images/logo.jpeg";
import authIllustration from "@/assets/images/auth-bg.jpg";

export const AuthLayout = () => {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-2">
      <section className="hidden lg:flex justify-center items-center min-h-screen bg-gray-200">
        <img
          src={authIllustration}
          alt="Auth"
          className="w-3/5 rounded-sm inline-block"
        />
      </section>
      <section className="min-h-screen flex items-center justify-center w-[95%] mx-auto max-w-[400px]">
        <img
          src={logo}
          alt="Auth"
          className="absolute top-4 right-4 h-6 lg:h-8"
        />
        <article className="w-full">
          <h2 className="scroll-m-20 text-3xl font-bold tracking-tight mb-12">
            Loan Management System
          </h2>
          <div className="mt-2">
            <Outlet />
          </div>
        </article>
      </section>
    </main>
  );
};
