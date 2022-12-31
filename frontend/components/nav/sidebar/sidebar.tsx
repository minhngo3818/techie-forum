import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Transition, Dialog } from "@headlessui/react";
import forumLinks from "../../../page-paths/forum";
import styles from "./Sidebar.module.css";

// Track current forum page, if not forum, reset styles
// useCallback for toggle the sidebar
interface SideBarProps {
  isToggled: boolean;
}

function Sidebar(props: SideBarProps) {
  const router = useRouter();
  const [currentPage, setPage] = useState("");

  return (
    <Transition
      as="div"
      className={styles.sidebar}
      show={props.isToggled}
      enter="transition transform opacity ease-in-out duration-300"
      enterFrom="opacity-0 translate-x-full"
      enterTo="opacity-100 -translate-x-0"
      leave="transition transform opacity duration-300"
      leaveFrom="opacity-100 -translate-x-0"
      leaveTo="opacity-0 translate-x-full"
    >
      <div className={styles.sidebarWrapper}>
        <h4 className={styles.sidebarTitle}>&gt;&#95; Terminals</h4>
        {forumLinks.map((forum) => {
          return (
            <Link
              className={
                currentPage !== forum.name
                  ? styles.sidebarLink
                  : styles.sidebarLinkActive
              }
              onClick={() => setPage(forum.name)}
              href="/forum/[field]"
              as={`/forum/${forum.path}`}
              key={forum.name}
              replace
            >
              {forum.name}
            </Link>
          );
        })}
      </div>
    </Transition>
  );
}

export default Sidebar;
