import styled from "styled-components";
import Stats from "./Stats.jsx";
import { useRecentBookings } from "./useRecentBookings.js";
import { useRecentStays } from "./useRecentStays.js";
import Spinner from "../../ui/Spinner.jsx";
import { useCabins } from "../cabins/useCabins.js";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoadingBookings } = useRecentBookings();
  const { stay, confirmedStays, isLoadingStays, numDays } = useRecentStays();

  const { cabins, isLoading } = useCabins();

  const cabinCount = cabins?.length;

  console.log("isLoadingBookings:", isLoadingBookings);
  console.log("isLoadingStays:", isLoadingStays);

  if (isLoadingBookings || isLoadingStays || isLoading) return <Spinner />;

  console.log("isLoadingBookings:", isLoadingBookings);
  console.log("isLoadingStays:", isLoadingStays);

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabinCount}
      />

      <div>Today's Activity</div>
      <div>Chart Stay Durations</div>
      <div>Chart of Sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
