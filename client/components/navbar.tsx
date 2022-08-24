import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import { forumLinks as forums } from "../data/forumLinks";
import styles from "../styles/Navbar.module.css";

const userPages = ["Dashboard", "Profile", "Account", "Logout"];

// TODO: break downs Navigation into sub functions
const Navigation = () => {
  return (
    <Navbar bg="light" variant="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand>Techies</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Forums" id="basic-nav-dropdown">
              {forums.map((forum) => {
                return (
                  <NavDropdown.Item
                    key={forum.name}
                    href={`/forum/${forum.path}`}
                  >
                    {forum.name}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
          </Nav>

          <Nav className="d-flex">
            <Nav.Link href="/">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
