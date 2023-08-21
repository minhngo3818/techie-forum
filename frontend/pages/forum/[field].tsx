import { useRouter } from "next/router";
import React, { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import Thread from "../../components/forum/thread/thread";
const ThreadForm = dynamic(
  () => import("../../components/form/form-thread/thread-form")
);
import { IThread } from "../../interfaces/forum/post/post";
import searchFilterThread from "../../utils/searchFilterThread";
import forumLinks from "../../page-paths/forum";
import styles from "../../styles/Forum.module.css";

// Helper function convert json data to ThreadUserInterface data
// Temporary use for testing rending frontend
// function convertData(data: any) {
//   let newData: IThread[] = [];
//   for (let i = 0; i < data?.length; i += 1) {
//     let dateObj = data[i].date.split("/");
//     let thread: IThread = {
//       id: data[i].id,
//       author: data[i].author,
//       authorId: data[i].authorId,
//       avatar: data[i].avatar,
//       date: new Date(dateObj[2], dateObj[0] - 1, dateObj[1]),
//       title: data[i].title,
//       content: data[i].content,
//       tags: new Set<TagInterface>(data[i].tags),
//       memorized: data[i].memorized,
//       likes: data[i].numOfLikes,
//     };
//     newData.push(thread);
//   }

//   return newData;
// }

export default function Field() {
  const router = useRouter();
  // let currentPageRoute = router.query.field;
  // console.log(currentPageRoute);
  // let linkObj = forumLinks.find((link) => link.path === currentPageRoute);
  // let currentPage = linkObj?.name ?? "Forum does not exist";
  const [forumName, setForumName] = useState("");
  const [category, setCategory] = useState("");
  const [threadList, setThreadList] = useState<IThread[]>([]);
  const [isThreadForm, setThreadForm] = useState(false);
  const [filter, setFilter] = useState(false);
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let field = router.query.field;
    if (field) {
      let pathObj = forumLinks.find((link) => link.path === field);
      setForumName(pathObj?.name as string);
      setCategory(field as string);
    }
  }, [router.query]);

  const handleFilterData = useCallback(() => {
    setFilter((filter) => !filter);
  }, []);

  const handleSearchData = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target?.value);
    },
    []
  );

  const handleOpenThreadForm = () => {
    setThreadForm(!isThreadForm);
  };

  const threads = [] as IThread[];
  const avatar = "/king-crimson.jpg";
  const images = [] as string[];
  const date = new Date(Date.now());
  const tags = new Set<string>();
  tags.add("Python");
  tags.add("Typescript");
  tags.add("C++");
  tags.add("SQL");
  tags.add("llvm");

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
      {threads
        .filter((thread) => searchFilterThread(thread, filter, search))
        .map((thread, index) => {
          return (
            <Thread
              key={index}
              keyId={index}
              id={thread.id}
              author={thread.author}
              authorId={thread.authorId}
              avatar={avatar}
              date={date}
              category={thread.category}
              title={thread.title}
              content={thread.content}
              likes={thread.likes}
              tags={tags}
              images={images}
            />
          );
        })}
    </div>
  );
}
