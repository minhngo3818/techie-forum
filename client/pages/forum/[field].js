import { Router, useRouter } from "next/router";
import dynamic from "next/dynamic";
import AuthGuard from "../../services/auth/AuthGuard";
import PageHeader from "../../components/page-header/PageHeader";
import { useState, useEffect } from "react";
import Thread from "../../components/forum/thread/Thread";
const ThreadForm = dynamic(
  () => import("../../components/forum/thread-form/ThreadForm"),
  { ssr: false }
);
import styles from "../../styles/Forum.module.css";

// TODO: Add loading effect
const Field = () => {
  // Page section
  const router = useRouter();

  let currentPage = router.query.field;
  let pageName = "";
  switch (currentPage) {
    case "web-design":
      pageName = "Web Design";
      break;
    case "server":
      pageName = "Server";
      break;
    case "cybersecurity":
      pageName = "Cybersecurity";
      break;
    case "game-dev":
      pageName = "Game Development";
      break;
    case "os":
      pageName = "Operating System";
      break;
    case "languages":
      pageName = "Programming Languages";
      break;
  }

  const [isThreadForm, setIsThreadForm] = useState(false);

  const handleIsThreadForm = () => {
    setIsThreadForm((prev) => !prev);
  };

  // Dummy content
  const author = "Tony";
  const title = "Making a super quantum computer";
  const content =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, r\
   sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis r\
   nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in r\
   eprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur r\
   sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ";
  const created = "07/17/2077";
  const likes = 200;
  return (
    <>
      <PageHeader pageName={pageName} />
      <div className={styles.container}>
        <div className={styles.toggleButton}>
          <button onClick={handleIsThreadForm}>Start a Thread</button>
          <button>Memorized</button>
        </div>
        <ThreadForm isOpen={isThreadForm} category={currentPage} />
        <Thread
          author={author}
          title={title}
          created={created}
          content={content}
          likes={likes}
        ></Thread>
      </div>
    </>
  );
};

export default AuthGuard(Field);
