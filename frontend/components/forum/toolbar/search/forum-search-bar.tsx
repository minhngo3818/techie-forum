import React from "react";
import { useState, useEffect } from "react";
import styles from "./ForumSearchBar.module.css";

interface ForumSearchBar {
  ref: React.RefObject<HTMLInputElement>;
  searchValue: string;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ForumSearchBar(props: ForumSearchBar) {
  return (
    <div className={styles.forumSearchBar}>
      <div className={styles.forumSearchLabel}>Search</div>
      <input
        className={styles.forumSearchInput}
        ref={props.ref}
        name="search"
        type="text"
        placeholder="Input keywords ..."
        value={props.searchValue}
        onChange={props.onSearch}
      />
    </div>
  );
}
