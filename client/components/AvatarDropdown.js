import { Container, Navbar, Nav, NavDropdown, Image } from "react-bootstrap";
import Link from "next/link";
import AuthContext from "../services/auth/AuthService";
import { useContext } from "react";
import { useRouter } from "next/router";
import userDropdowns from "../data/user-links";

const AvatarDropdown = () => {
  const { logout } = useContext(AuthContext);

  const Avatar = (
    <Image
      src="../public/johnny.png"
      width="40px"
      height="40px"
      alt="user-avatar"
      roundedCircle
    />
  );

  return (
    <>
      <NavDropdown title={Avatar}>
        {userDropdowns.map((dropdown) => {
          return (
            <Link href={`${dropdown.path}`}>
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
