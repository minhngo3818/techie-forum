import React, { useState, useRef, useEffect, useCallback } from "react";
import Box from "../../utils/box/box";
import ProfileHeader from "./header/profile-header";
import ProfileIdentity from "./identity/profile-identity";
import ProfileStats from "./stats/profile-stats";
import ProfileRefLinksForward from "./ref-links/profile-reflinks";
import EditButton from "../../utils/buttons/edit-button/edit-button";
import ProfileInterface from "../../../interfaces/profile";
import styles from "./ProfileGeneralInfo.module.css";

export default function ProfileGeneralInfo() {
  const [isEdit, setEdit] = useState(false);
  const linkRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEdit && linkRef.current != null) {
      linkRef.current.focus();
    }
  });

  const handleChange = () => {};

  // replace with data
  const name = "Made In Heaven";
  const avatar = "/made-in-heaven.jpg";

  return (
    <Box
      width={960}
      height={500}
      borderWidth={1}
      margin="my-10"
      clipType="clip-cyber-left"
    >
      <div className={styles.generalContainer}>
        <ProfileHeader />
        <div className={styles.genDetailWrapper}>
          <div className={styles.genDetailCol}>
            <ProfileStats thread={55} comment={100} reputation={800} />
            <EditButton isEdit={isEdit} onClick={() => setEdit(!isEdit)} />
          </div>
          <div className={styles.genDetailCol}>
            <ProfileIdentity
              isEdit={isEdit}
              profileName={name}
              avatar={avatar}
              handleChange={handleChange}
            />
          </div>
          <div className={styles.genDetailCol}>
            <ProfileRefLinksForward
              ref={linkRef}
              isEdit={isEdit}
              twitter="https://twitter.com/konstancetine"
              github="https://github.com/konstancetine"
              stackoverflow="https://stackoverflow/konstancetine"
            />
          </div>
        </div>
      </div>
    </Box>
  );
}
