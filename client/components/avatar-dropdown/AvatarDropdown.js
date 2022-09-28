import { Container, Navbar, Nav, NavDropdown, Image } from "react-bootstrap";
import Link from "next/link";
import AuthContext from "../../services/auth/AuthService";
import { useContext } from "react";
import userDropdowns from "../../page-path/user-links";
import styles from "./AvatarDropdown.module.css";

const AvatarDropdown = () => {
  const { logout, profile } = useContext(AuthContext);

  const Avatar = (
    <Image
      className={styles.image}
      src={profile?.avatar}
      width="40px"
      height="40px"
      alt="user-avatar"
      roundedCircle
    />
  );

  return (
    <>
      <NavDropdown className={styles.dropdown} title={Avatar}>
        {userDropdowns.map((dropdown) => {
          return (
            <Link key={dropdown.name} href={`/user/${dropdown.path}`}>
              <NavDropdown.Item key={dropdown.name} as="a" type="button">
                {dropdown.name}
              </NavDropdown.Item>
            </Link>
          );
        })}
        <NavDropdown.Divider />
        <NavDropdown.Item as="a" type="button" onClick={logout}>
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default AvatarDropdown;
