import React from "react";
import Link from "next/link";
import PageTitle from "../../components/utils/page-title/page-title";
import forumLinks from "../../page-paths/forum";
import styles from "../../styles/Forum.module.css";

function Forum() {
  return (
    <div id="container" className={styles.forumLinkContainer}>
      <PageTitle title=">_ Welcome back, technomancer!" />
      <div className={styles.forumLinkWrapper}>
        {forumLinks.map((forum) => {
          return (
            <Link
              className={styles.forumLink}
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
    </div>
  );
}

export default Forum;
