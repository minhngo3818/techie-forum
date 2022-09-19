import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import forumLinks from "../../page-path/forum-links";
import Link from "next/link";
import AuthContext from "../../services/auth/AuthService";
import { useContext } from "react";
import { useRouter } from "next/router";
import AvatarDropdown from "../avatar-dropdown/AvatarDropdown";
import styles from "./Navbar.module.css";

// TODO: break downs Navigation into sub functions
// Show forums in icon in navbar
const Navigation = () => {
  const router = useRouter();
  let { auth } = useContext(AuthContext);

  return (
    <Navbar bg="light" variant="light" expand="lg" sticky="top">
      <Container>
        <Link href={"/"}>
          <Navbar.Brand className={styles.brand}>Techies</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            {auth &&
              forumLinks.map((forum) => {
                return (
                  <Link href={`/forum/${forum.path}`} key={forum.name}>
                    <Nav.Link className={styles.forumLink} as="a" type="button">
                      {forum.name}
                    </Nav.Link>
                  </Link>
                );
              })}
          </Nav>

          <Nav className="justify-content-end">
            {auth ? (
              <AvatarDropdown />
            ) : (
              <Link href="/login">
                <Nav.Link className={styles.navLink} as="a" type="button">
                  Login
                </Nav.Link>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
