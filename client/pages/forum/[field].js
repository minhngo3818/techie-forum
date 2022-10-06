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
import ThreadServices from "../../services/forum/ThreadServices";
import threadData from "../../utils/dummy-generator";
import styles from "../../styles/Forum.module.css";

// TODO: Add loading effect
const Field = () => {
  // Page section
  const router = useRouter();

  let currentPage = router.query.field; // Assign to variable in order to keep track router.query
  const pageMap = {
    "web-design": "Web Design",
    server: "Server",
    cybersecurity: "Cybersecurity",
    "game-dev": "Game Dev",
    os: "Operating System",
    languages: "Programming Languages",
  };
  let pageName = pageMap[currentPage] ?? "Forum does not exist";

  // Get threads from a category
  let threads = threadData.filter((thread) => {
    return thread.category === currentPage;
  });

  // States
  const [isThreadForm, setIsThreadForm] = useState(false);

  // Handlers
  const handleIsThreadForm = () => {
    setIsThreadForm((prev) => !prev);
  };

  return (
    <>
      <PageHeader pageName={pageName} />
      <div className={styles.container}>
        <div className={styles.toggleButton}>
          <button onClick={handleIsThreadForm}>Start a Thread</button>
          <button>Memorized</button>
        </div>
        <ThreadForm isOpen={isThreadForm} category={currentPage} />
        {threads.map((thread) => {
          return (
            <Thread
              author={thread.author}
              avatar={thread.avatar}
              title={thread.title}
              created={thread.created}
              content={thread.content}
              tags={thread.tags}
              likes={thread.likes}
              numOfComments={thread.numOfComments}
            />
          );
        })}
      </div>
    </>
  );
};

export default AuthGuard(Field);
