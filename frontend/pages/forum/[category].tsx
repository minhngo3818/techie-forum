import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import React, { useState, useEffect, useRef, useCallback } from "react";
import ThreadForm from "../../components/form/form-thread/thread-form";
import { IThread } from "../../interfaces/forum/post/post";
import searchFilterThread from "../../utils/searchFilterThread";
import forumLinks from "../../page-paths/forum";
import styles from "../../styles/Forum.module.css";
import { getPaginatedThreads } from "../../services/forum/thread/thread-service";
const Thread = dynamic(() => import("../../components/forum/thread/thread"));

export default function Category(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();
  const [threadList, setThreadList] = useState<IThread[]>(props.threads);
  const [forumName, setForumName] = useState("");
  const [category, setCategory] = useState("");
  const [isThreadForm, setThreadForm] = useState(false);
  const [filter, setFilter] = useState(false);
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

  const handleFilterData = useCallback(() => {
    setFilter((filter) => !filter);
  }, []);

  const handleSearchData = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target?.value);
    },
    []
  );

  // TODO: update thread list when user post/update a thread
  const handleAddNewThread = useCallback(() => {}, threadList);

  const handleUpdateThreadItem = useCallback(() => [], threadList);

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
          className={`${styles.forumTool} ${
            isThreadForm && styles.forumToolActive
          }`}
          onClick={handleFilterData}
        >
          Memorize
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
        .filter((thread) => searchFilterThread(thread, filter, search))
        .map((thread, index) => {
          return (
            <Thread
              key={index}
              keyId={index}
              id={thread.id}
              author={thread.author}
              date={new Date(thread.date)}
              category={thread.category}
              title={thread.title}
              content={thread.content}
              isMarked={thread.isMarked}
              likes={thread.likes}
              isLiked={thread.isLiked}
              tags={thread.tags}
              images={thread.images}
            />
          );
        })}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  threads: IThread[];
}> = async (context) => {
  const { query } = context;
  let category = query.category as string;
  const data = await getPaginatedThreads(category);
  const threads = data.results;
  let threadList: IThread[] = [];

  for (let i = 0; i < threads.length; i += 1) {
    let thread: IThread = {
      id: threads[i].id,
      author: threads[i].author,
      category: threads[i].category,
      date: threads[i].updated_at,
      title: threads[i].title,
      content: threads[i].content,
      images: threads[i].images,
      tags: threads[i].tags,
      isMarked: threads[i].is_marked,
      likes: threads[i].likes,
      isLiked: threads[i].is_liked,
    };
    threadList.push(thread);
  }

  return { props: { threads: threadList } };
};
