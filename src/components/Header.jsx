import React from "react";
import {Navbar, Container, Nav, NavLink} from "react-bootstrap";

const Header = () => {
    return (
                
      <Navbar bg={"light"} expand={"lg"}>
      <Container>
          <Navbar.Brand href={"/"}>
              <img alt={""} src={"/logo.png"}
                   width={"30"}
                   height={"30"}
                   className="d-inline-block align-top"
                   />
              Elonus
          </Navbar.Brand>
      </Container>
  </Navbar>
    );
}

export default Header;