import React, { useState, useRef, useEffect, useCallback } from "react";
import Box from "../../utils/box/box";
import ProfileHeader from "./header/profile-header";
import ProfileIdentity from "./identity/profile-identity";
import ProfileStats from "./stats/profile-stats";
import ProfileRefLinksForward from "./ref-links/profile-reflinks";
import RefLinksInterface from "../../../interfaces/profile/ref-links";
import EditButton from "../../utils/buttons/edit-button/edit-button";
import styles from "./ProfileGeneralInfo.module.css";

interface ProjectGeneralInfoType extends RefLinksInterface {
  profileName: string;
  avatar: string;
  threadsCount: number;
  commentsCount: number;
  reputationsCount: number;
  handleChange: () => void;
  handleSubmit: () => void;
}

export default function ProfileGeneralInfo(props: ProjectGeneralInfoType) {
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
            <ProfileStats
              thread={props.threadsCount}
              comment={props.commentsCount}
              reputation={props.reputationsCount}
            />
            <EditButton
              isEdit={isEdit}
              onClick={() => setEdit(!isEdit)}
              onSubmit={props.handleSubmit}
            />
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
