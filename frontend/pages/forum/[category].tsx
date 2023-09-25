import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { IThread } from "@interfaces/forum/post/post";
import { getPaginatedThreads } from "@services/forum/thread/thread-service";
import ThreadForm from "@components/form/form-thread/thread-form";
import ForumTitle from "@components/forum/title/forum-title";
import ForumToolbar from "@components/forum/toolbar/forum-toolbar";
import ForumToolbarBtn from "@components/forum/toolbar/button/forum-toolbar-btn";
import ForumSearchBar from "@components/forum/toolbar/search/forum-search-bar";
import ForumContainer from "@components/forum/container/forum-container";
import searchFilterThread from "@utils/searchFilterThread";
import forumLinks from "../../page-paths/forum";
import authGuard from "@services/auth/auth-guard";
const Thread = dynamic(() => import("@components/forum/thread/thread"));

function Category(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();
  const [threadList, setThreadList] = useState<IThread[]>(props.list);
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
      setThreadList(props.list);
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

  const handleAddNewThread = useCallback(
    async (newThread: IThread) => {
      let newThreadList = threadList;
      newThreadList.unshift(newThread);
      setThreadList(newThreadList);
      setThreadForm((isThreadForm) => !isThreadForm);
    },
    [threadList]
  );

  const handleOpenThreadForm = () => {
    setThreadForm(!isThreadForm);
  };

  return (
    <ForumContainer>
      <ForumTitle>{forumName}</ForumTitle>
      <ForumToolbar>
        <ForumToolbarBtn
          label="Post Thread"
          name="post-thread"
          isActive={isThreadForm}
          onClick={handleOpenThreadForm}
        />
        <ForumToolbarBtn
          label="Marked"
          name="marked-list"
          isActive={marked}
          onClick={handleFilterMarkedThreads}
        />
        <ForumSearchBar
          searchValue={search}
          onSearch={handleSearchData}
        />
      </ForumToolbar>
      <ThreadForm
        isShow={isThreadForm}
        category={category}
        handleAddNewThread={handleAddNewThread}
      />
      {threadList
        .filter((thread) => searchFilterThread(thread, marked, search))
        .map((thread, index) => {
          return <Thread key={index} keyId={index} thread={thread} />;
        })}
    </ForumContainer>
  );
}

export const getServerSideProps: GetServerSideProps<{
  list: IThread[];
  nextId: string;
}> = async (context) => {
  const { query } = context;
  let category = query.category as string;
  const results = await getPaginatedThreads(context.req, category);
  return {
    props: {
      list: results?.threads || [],
      nextId: results?.nextId || null,
    },
  };
};

export default authGuard<IThread>(Category);
