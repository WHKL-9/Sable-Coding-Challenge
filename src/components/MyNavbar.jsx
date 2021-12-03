import { Navbar } from "react-bootstrap";
import "../App.css";

const MyNavbar = () => (
  <Navbar className="myNavbar">
    <Navbar.Brand href="#home">
      <img src="https://res.cloudinary.com/demwthyen/image/upload/v1638536828/Sable_welzyk.png"
      alt="Sable-Logo"
      className="sableLogo"
      />
    </Navbar.Brand>
  </Navbar>
);

export default MyNavbar;
