import { Container, DashboardCard, PageTitle } from "@/components/shared";
import { FaCheckCircle, FaHourglass } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const Dashboard = () => {
  return (
    <Container>
      <PageTitle title="Dashboard" />
      <article className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <DashboardCard
          count={20}
          title="Completed Requests"
          theme="success"
          icon={<FaCheckCircle className="text-white text-3xl" />}
        />
        <DashboardCard
          count={4}
          title="Pending Requests"
          theme="warn"
          icon={<FaHourglass className="text-white text-3xl" />}
        />
        <DashboardCard
          count={5}
          title="Declined Requests"
          theme="danger"
          icon={<MdCancel className="text-white text-3xl" />}
        />
      </article>
    </Container>
  );
};

export default Dashboard;
