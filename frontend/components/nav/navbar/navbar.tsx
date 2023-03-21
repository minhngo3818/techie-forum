import React, { useContext, useEffect } from "react";
import { Menu } from "../../icons/icons";
import Link from "next/link";
import useShowComponent from "../../../hooks/useShowComponent";
import useAuth from "../../../services/auth/auth-guard";
import authService from "../../../services/auth/auth-services";
import { Tooltip } from "react-tooltip";
import "node_modules/react-tooltip/dist/react-tooltip.min.css";
import styles from "./Navbar.module.css";
import UserInterface from "../../../interfaces/user/user-interface";

type NavbarProps = {
  isToggled: Boolean;
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
};

function NavUserBtn({ username }: { username: string }): JSX.Element {
  const { dependentRef, ref, isShow, setIsShow } = useShowComponent(false);

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
        {username}
      </button>
      <Tooltip
        anchorId="user-dropdowns"
        content="User Navs"
        events={["hover"]}
      />
      {isShow && (
        <div className={styles.navDropdownWrapper}>
          <Link
            href="/user/profile"
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
            onMouseDown={authService.logout}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}

// TODO: login user does not display on navbar
export default function Navbar(props: NavbarProps) {
  const context = useAuth();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navWrapper}>
        <div arial-label="brand" className={styles.navBrandWrapper}>
          <Link href="/" className={styles.navBrand}>
            Techies Forum
          </Link>
        </div>
        {context?.user !== undefined ? (
          <React.Fragment>
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
          </React.Fragment>
        ) : (
          <NavUserBtn username={""} />
        )}
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
