import { Container } from "react-bootstrap";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";

const DefaultLayout = () => {
  return (
    <Container fluid className="App">
      <Header />
      <Main />
      <Footer />
    </Container>
  );
};

export default DefaultLayout;
