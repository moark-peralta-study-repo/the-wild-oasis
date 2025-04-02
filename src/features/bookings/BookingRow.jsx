import { format, isToday } from "date-fns";
import { formatCurrency } from "../../utils/helpers.js";
import { formatDistanceFromNow } from "../../utils/helpers.js";
import { useNavigate, useParams } from "react-router-dom";
import { useCheckOut } from "../check-in-out/useCheckOut.js";
import { useDeleteBooking } from "./useDeleteBooking.js";
import { HiEye, HiTrash } from "react-icons/hi";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import styled from "styled-components";

import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import Tag from "../../ui/Tag.jsx";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  // booking: {
  //   id: bookingId,
  //   created_at,
  //   startDate,
  //   endDate,
  //   numNights,
  //   numGuests,
  //   totalPrice,
  //   status,
  //   guests: { fullName: guestName, email },
  //   cabins: { name: cabinName },
  // }
  booking,
}) {
  const {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins,
  } = booking;

  const navigate = useNavigate();
  const { checkOut, isCheckingOut } = useCheckOut();
  const { isDeleting, deleteBooking } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (!cabins) {
    return <div>No cabins available.</div>;
  }

  const { name } = cabins;

  return (
    <Table.Row>
      <Cabin>{name}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              onClick={() => navigate(`/bookings/${bookingId}`)}
              icon={<HiEye />}
            >
              See Details
            </Menus.Button>
            {status === "unconfirmed" && (
              <Menus.Button
                onClick={() => navigate(`/checkin/${bookingId}`)}
                icon={<HiArrowDownOnSquare />}
              >
                Check in
              </Menus.Button>
            )}

            {status === "checked-in" && (
              <Menus.Button
                onClick={() => {
                  checkOut(bookingId);
                }}
                icon={<HiArrowUpOnSquare />}
                disabled={isCheckingOut}
              >
                Check out
              </Menus.Button>
            )}

            <Modal.Open opens="delete">
              <Menus.Button
                onClick={() => deleteBooking(bookingId)}
                disabled={isDeleting}
                icon={<HiTrash />}
              >
                Delete
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="bookings"
            disabled={isDeleting}
            onConfirm={() => deleteBooking(bookingId)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
