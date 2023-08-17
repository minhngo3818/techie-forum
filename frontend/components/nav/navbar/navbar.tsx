import React from "react";
import { Menu } from "../../icons/icons";
import Link from "next/link";
import useShowComponent from "../../../hooks/useShowComponent";
import useAuth from "../../../services/auth/auth-provider";
import { Tooltip } from "react-tooltip";
import "node_modules/react-tooltip/dist/react-tooltip.min.css";
import styles from "./Navbar.module.css";

type NavbarProps = {
  isToggled: Boolean;
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
};

export default function Navbar(props: NavbarProps) {
  const { user, logout } = useAuth();
  const { dependentRef, ref, isShow, setIsShow } = useShowComponent(false);

  function UnAuthNav(): JSX.Element {
    return (
      <>
        <Link
          href="/login"
          className={`${styles.navLoginBtn} + ${styles.navLoginLink}`}
        >
          Login
        </Link>
        <Link
          href="/register"
          className={`${styles.navLoginBtn} + ${styles.navLoginLink}`}
        >
          Register
        </Link>
      </>
    );
  }

  function AuthNav(): JSX.Element {
    return (
      <div className="relative w-36 h-8 mr-4">
        <button
          id="user-dropdowns"
          type="button"
          className={`${styles.navLoginBtn} ${styles.navLoginUser} ${
            isShow && styles.navUserDropdwnActive
          }`}
          ref={ref}
          onClick={() => setIsShow(!isShow)}
        >
          {user?.username}
        </button>
        <Tooltip
          anchorId="user-dropdowns"
          content="User Navs"
          events={["hover"]}
        />
        {isShow && (
          <div className={styles.navDropdownWrapper}>
            <Link
              href={`/profile/${
                user?.profile_name !== null ? user?.profile_name : "create"
              }`}
              className={`${styles.navDropdown} + ${styles.navDropdownLink}`}
            >
              Profile
            </Link>
            <hr className="w-5/6" />
            <Link
              href="/user/account"
              className={`${styles.navDropdown} + ${styles.navDropdownLink}`}
            >
              Account
            </Link>
            <hr className="w-5/6" />
            <button
              className={`${styles.navDropdown} + ${styles.navDropdownLogout}`}
              role="button"
              onMouseDown={logout}
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navWrapper}>
        <div aria-label="brand" className={styles.navBrandWrapper}>
          <Link href={user ? "/forum" : "/"} className={styles.navBrand}>
            Techies Forum
          </Link>
        </div>
        {!user ? <UnAuthNav /> : <AuthNav />}
        <button
          id="sidebar-toggle"
          className={
            !props.isToggled
              ? styles.navSidebarToggler
              : styles.navTogglerActive
          }
          role="button"
          onClick={props.onClick}
        >
          <Menu />
        </button>
        <Tooltip
          anchorId="sidebar-toggle"
          content="Explore terminals"
          events={["hover"]}
        />
      </div>
    </nav>
  );
}
