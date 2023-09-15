import { useState, useEffect } from "react";
import IconButton from "@components/utils/buttons/icon-button/icon-button";
import styles from "./ForumToolbarBtn.module.css";

interface ForumToolbarBtn {
  label: string;
  name: string;
  onClick: () => void;
  isActive: boolean;
}

export default function ForumToolbarBtn(props: ForumToolbarBtn) {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    if (window.innerWidth < 640) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile) {
    return (
      <div className={styles.FTBtnMobileWrapper}>
        <IconButton
          keyId="forum-btn"
          name={props.name}
          content={props.label}
          isState={props.isActive}
          setState={props.onClick}
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      className={`${styles.FTBtn} ${props.isActive && styles.FTBtnActive}`}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
}
