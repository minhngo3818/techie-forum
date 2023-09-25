import React, { useRef } from "react";
import { useState, useEffect } from "react";
import useShowComponent from "@hooks/useShowComponent";
import styles from "./ForumSearchBar.module.css";
import { Search } from "@components/icons/icons";
import { Transition, Dialog } from "@headlessui/react";

interface ForumSearchBar {
  searchValue: string;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ForumSearchBar(props: ForumSearchBar) {
  const [isMobile, setIsMobile] = useState(false);
  const { isShow, setIsShow } = useShowComponent(false);
  const searchRef = useRef<HTMLInputElement>(null)

  const handleIsMobile = () => {
    if (window.innerWidth < 640) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleIsMobile);

    return () => {
      window.removeEventListener("resize", handleIsMobile);
    };
  });

  if (isMobile) {
    return (
      <div className={styles.FResSearchContainer}>
        <button
          className={styles.FResSearchOpenBtn}
          type="button"
          onClick={() => setIsShow(!isShow)}
        >
          Search
        </button>
        <Transition show={isShow}>
          <Dialog open={isShow} onClose={() => setIsShow(!isShow)}>
            <Dialog.Panel
              className={styles.FResSearchFormContainer}
              style={{ top: scrollY }}
            >
              <Dialog.Overlay className={styles.FResSearchFormOverlay} />
              <Transition.Child
                className={styles.FResSearchFormModal}
                enter="transition-all ease duration-300"
                enterFrom="opacity-0 -translate-y-1/2"
                enterTo="opacity-100 -translate-y-1/4"
                leave="transition-all duration-300"
                leaveFrom="opacity-100 -translate-y-1/4"
                leaveTo="opacity-0 -translate-y-1/2"
              >
                <label>&gt;_ Enter keyword: </label>
                <span className="flex items-center">
                  <input
                    className={styles.FResSearchFormInput}
                    placeholder="ReactJS ..."
                  ></input>
                  <button className={styles.FResSearchFormBtn} type="button">
                    <Search className={styles.FResSearchFormBtnIcon} />
                  </button>
                </span>
              </Transition.Child>
            </Dialog.Panel>
          </Dialog>
        </Transition>
      </div>
    );
  }

  return (
    <div className={styles.FSearchBar}>
      <div className={styles.FSearchLabel}>Search</div>
      <input
        className={styles.FSearchInput}
        ref={searchRef}
        name="search"
        type="text"
        placeholder="Input keywords ..."
        value={props.searchValue}
        onChange={props.onSearch}
      />
    </div>
  );
}
