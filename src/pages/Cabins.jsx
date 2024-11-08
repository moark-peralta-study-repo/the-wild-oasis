import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins.js";
import { useEffect } from "react";

function Cabins() {
  useEffect(() => {
    return () => {
      getCabins().then((data) => console.log(data));
    };
  }, []);

  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
    </Row>
  );
}

export default Cabins;
