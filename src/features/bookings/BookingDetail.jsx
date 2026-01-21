import styled from "styled-components";
import { useMoveBack } from "../../hooks/useMoveBack.js";
import { useBooking } from "./useBooking.js";
import { useNavigate } from "react-router-dom";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckOut } from "../check-in-out/useCheckOut.js";
import { HiTrash } from "react-icons/hi";
import { useDeleteBooking } from "./useDeleteBooking.js";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Tag from "../../ui/Tag.jsx";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import Button from "../../ui/Button.jsx";
import ButtonText from "../../ui/ButtonText.jsx";
import Spinner from "../../ui/Spinner.jsx";
import BookingDataBox from "./BookingDataBox.jsx";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import Empty from "../../ui/Empty.jsx";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { checkOut, isCheckingOut } = useCheckOut();
  const { isDeleting, deleteBooking } = useDeleteBooking();

  const navigate = useNavigate();
  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resourceName="booking" />;

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
      <Modal>
        <ButtonGroup>
          {status === "unconfirmed" && (
            <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
              Check in
            </Button>
          )}

          {status === "checked-in" && (

            <Button
              onClick={() => {
                checkOut(bookingId);
              }}
              icon={<HiArrowUpOnSquare />}
              disabled={isCheckingOut}
            >
              Check out
            </Button>
          )}

          <Modal.Open opens="delete">
            <Button
              variation="danger"
              onClick={() => {
                deleteBooking(bookingId, {
                  onSettled: () => {
                    navigate(-1);
                  },
                });
              }}
              disabled={isDeleting}
              icon={<HiTrash />}
            >
              Delete
            </Button>
          </Modal.Open>

          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="bookings"
            disabled={isDeleting}
            onConfirm={() => {
              deleteBooking(bookingId);
              navigate("/bookings");
            }}
          />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetail;
