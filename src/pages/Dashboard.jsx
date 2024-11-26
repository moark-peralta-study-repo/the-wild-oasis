import { useRecentBookings } from "../features/dashboard/useRecentBookings.js";
import { useRecentStays } from "../features/dashboard/useRecentStays.js";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner.jsx";
import DashboardFilter from "../features/dashboard/DashboardFilter.jsx";
import DashboardLayout from "../features/dashboard/DashboardLayout.jsx";

function Dashboard() {
  const { bookings, isLoadingBookings } = useRecentBookings();
  const { stay, confirmedStays, isLoadingStays } = useRecentStays();

  if (isLoadingBookings || isLoadingStays) return <Spinner />;

  console.log(bookings);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>

      <DashboardLayout />
    </>
  );
}

export default Dashboard;
