import { Container, DashboardCard, PageTitle } from "@/components/shared";
import React from "react";

const Dashboard = () => {
  return (
    <Container>
      <PageTitle title="Dashboard" />
      <article className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <DashboardCard count={20} title="Completed Requests" theme="success" />
        <DashboardCard count={4} title="Pending Requests" theme="warn" />
        <DashboardCard count={5} title="Declined Requests" theme="danger" />
      </article>
    </Container>
  );
};

export default Dashboard;
