import React from "react";
import { Diamond } from "@components/icons/icons";
import styles from "./ProfileHeader.module.css";

export default function ProfileHeader() {
  return (
    <div className={styles.genDecorWrapper}>
      {/* Add loading bar effect  */}
      <Diamond className={styles.genDiamond} />
      <div className={styles.genTitle}>Profile</div>
      <Diamond className={styles.genDiamond} />
    </div>
  );
}
