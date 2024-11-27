import Button from "../../ui/Button.jsx";
import { useCheckOut } from "./useCheckOut.js";

function CheckoutButton({ id }) {
  const { isCheckingOut, checkOut } = useCheckOut();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkOut(id)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
