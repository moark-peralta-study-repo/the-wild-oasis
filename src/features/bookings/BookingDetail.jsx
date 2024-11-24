import styled from "styled-components";

import BookingDataBox from "./BookingDataBox.jsx";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import { useMoveBack } from "../../hooks/useMoveBack.js";
import { useBooking } from "./useBooking.js";
import { useNavigate } from "react-router-dom";

import Tag from "../../ui/Tag.jsx";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import Button from "../../ui/Button.jsx";
import ButtonText from "../../ui/ButtonText.jsx";
import Spinner from "../../ui/Spinner.jsx";
import Menus from "../../ui/Menus.jsx";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckOut } from "../check-in-out/useCheckOut.js";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { checkOut, isCheckingOut } = useCheckOut();

  const navigate = useNavigate();
  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;

  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}

        <Button
          onClick={() => {
            checkOut(bookingId);
          }}
          icon={<HiArrowUpOnSquare />}
          disabled={isCheckingOut}
        >
          Check out
        </Button>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
