import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { forumLinks as forums } from "../data/forumLinks";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";

const userPages = ["Dashboard", "Profile", "Account", "Logout"];

// TODO: break downs Navigation into sub functions
const Navigation = () => {
  return (
    <Navbar bg="light" variant="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand className={styles.brand}>Techies</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href={`/homepage`}>
              <Nav.Link className={styles.navLink} as="a" type="button">
                Home
              </Nav.Link>
            </Link>
            <Nav.Link className={styles.navLink} as="a" type="button">
              About
            </Nav.Link>
            <NavDropdown
              className={styles.navLink}
              title="Forums"
              id="basic-nav-dropdown"
            >
              {forums.map((forum) => {
                return (
                  <Link href={`/forum/${forum.path}`} key={forum.name}>
                    <NavDropdown.Item as="a" type="button">
                      {forum.name}
                    </NavDropdown.Item>
                  </Link>
                );
              })}
            </NavDropdown>
          </Nav>

          <Nav className="justify-content-end">
            <Link href={`/login`}>
              <Nav.Link className={styles.navLink} as="a" type="button">
                Login
              </Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
