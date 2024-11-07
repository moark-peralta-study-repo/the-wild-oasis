import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles.js";
import Button from "./ui/Button.jsx";
import Input from "./ui/Input.jsx";
import Heading from "./ui/Heading.jsx";
import Row from "./ui/Row.jsx";

const StyledApp = styled.div`
  //background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        >
        <Row>
          <Row type="horizontal">
            <Heading as="h1">The Wild Oasis</Heading>

            <div>
              <Heading as="h2">Check in and out</Heading>

              <Button variation="primary" size={"medium"}>
                Check in
              </Button>
              <Button variatio="secondary" size="small">
                Check in
              </Button>
            </div>
          </Row>
          <Row>
            <Heading as="h3">Form</Heading>
            <form>
              <Input type="number" placeholder="No. of guests"></Input>
              <Input type="number" placeholder="No. of guests"></Input>
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

Row.defaultProps = {
  type: "vertical",
};

export default App;
