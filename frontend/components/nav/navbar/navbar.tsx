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
      </>
    );
  }

  function AuthNav(): JSX.Element {
    return (
      <div className={styles.navDropdownContainer}>
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
            Techie Forum
          </Link>
        </div>
        {!user ? <UnAuthNav /> : <AuthNav />}
        {user && (
          <button
            id="sidebar-toggle"
            className={`${styles.navSidebarToggler}
            ${
              !props.isToggled
                ? styles.navTogglerInactive
                : styles.navTogglerActive
            }`}
            role="button"
            onClick={props.onClick}
          >
            <Menu />
          </button>
        )}
        <Tooltip
          anchorId="sidebar-toggle"
          content="Explore terminals"
          events={["hover"]}
        />
      </div>
    </nav>
  );
}
