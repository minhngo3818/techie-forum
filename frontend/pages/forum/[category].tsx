import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import React, { useState, useEffect, useRef, useCallback } from "react";
import ThreadForm from "@components/form/form-thread/thread-form";
import { IThread } from "@interfaces/forum/post/post";
import { getPaginatedThreads } from "@services/forum/thread/thread-service";
import searchFilterThread from "@utils/searchFilterThread";
import styles from "@styles/Forum.module.css";
import forumLinks from "../../page-paths/forum";
const Thread = dynamic(() => import("@components/forum/thread/thread"));

export default function Category(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();
  const [threadList, setThreadList] = useState<IThread[]>(props.threads);
  const [forumName, setForumName] = useState("");
  const [category, setCategory] = useState("");
  const [isThreadForm, setThreadForm] = useState(false);
  const [marked, setMarked] = useState(false);
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let paramCategory = router.query.category;
    if (paramCategory) {
      let pathObj = forumLinks.find((link) => link.path === paramCategory);
      setForumName(pathObj?.name as string);
      setCategory(paramCategory as string);
      setThreadList(props.threads);
    }
  }, [router.query, category]);

  const handleFilterMarkedThreads = useCallback(() => {
    setMarked((marked) => !marked);
  }, [threadList]);

  const handleSearchData = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target?.value);
    },
    [threadList]
  );

  const handleOpenThreadForm = () => {
    setThreadForm(!isThreadForm);
  };

  return (
    <div className={styles.forumContainer}>
      <h2 className={styles.forumHeader}>&gt;_ {forumName}</h2>
      <div className={styles.forumToolBar}>
        <button
          type="button"
          className={`${styles.forumTool} ${
            isThreadForm && styles.forumToolActive
          }`}
          onClick={handleOpenThreadForm}
        >
          Post Thread
        </button>
        <button
          type="button"
          className={`${styles.forumTool} ${marked && styles.forumToolActive}`}
          onClick={handleFilterMarkedThreads}
        >
          Marked
        </button>
        <div className={styles.forumSearchBar}>
          <p className={styles.forumSearchLabel}>Search</p>
          <input
            className={styles.forumSearchInput}
            ref={searchRef}
            name="search"
            type="text"
            placeholder="Input keywords ..."
            value={search}
            onChange={handleSearchData}
          />
        </div>
      </div>
      <ThreadForm isShow={isThreadForm} category={category} />
      {threadList
        .filter((thread) => searchFilterThread(thread, marked, search))
        .map((thread, index) => {
          return <Thread key={index} keyId={index} thread={thread} />;
        })}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  threads: IThread[];
  nextId: string;
}> = async (context) => {
  const { query } = context;
  let category = query.category as string;
  const results = await getPaginatedThreads(context.req, category);
  return {
    props: {
      threads: results?.threads || [],
      nextId: results?.nextId || null,
    },
  };
};
