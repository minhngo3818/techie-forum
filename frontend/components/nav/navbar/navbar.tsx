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
  const context = useAuth();
  const { dependentRef, ref, isShow, setIsShow } = useShowComponent(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navWrapper}>
        <div aria-label="brand" className={styles.navBrandWrapper}>
          <Link href="/" className={styles.navBrand}>
            Techies Forum
          </Link>
        </div>
        {!context.user ? (
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
              {context.user.username}
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
                  onMouseDown={context.logout}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
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
