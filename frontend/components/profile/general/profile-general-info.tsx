import React, { useState, useRef, useEffect } from "react";
import Box from "../../utils/box/box";
import ProfileHeader from "./header/profile-header";
import ProfileIdentity from "./identity/profile-identity";
import ProfileStats from "./stats/profile-stats";
import ProfileRefLinksForward from "./ref-links/profile-reflinks";
import { ProfileInterface } from "../../../interfaces/profile/profile";
import EditButton from "../../utils/buttons/edit-button/edit-button";
import styles from "./ProfileGeneralInfo.module.css";

interface ProfileGeneralInfoType extends ProfileInterface {
  isSameUser: boolean;
  handleChange: () => void;
  handleSubmit: () => void;
}

export default function ProfileGeneralInfo(props: ProfileGeneralInfoType) {
  const [isEdit, setEdit] = useState(false);
  const linkRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEdit && linkRef.current != null) {
      linkRef.current.focus();
    }
  });

  const handleChange = () => {};

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
              thread={props.threadCounts}
              comment={props.commentCounts}
              reputation={props.likeCounts}
            />
            {!props.isSameUser ? (
              <></>
            ) : (
              <EditButton
                isEdit={isEdit}
                onClick={() => setEdit(!isEdit)}
                onSubmit={props.handleSubmit}
              />
            )}
          </div>
          <div className={styles.genDetailCol}>
            <ProfileIdentity
              isEdit={isEdit}
              profileName={props.profile_name}
              avatar={props.avatar}
              handleChange={handleChange}
            />
          </div>
          <div className={styles.genDetailCol}>
            <ProfileRefLinksForward
              ref={linkRef}
              isEdit={isEdit}
              twitter={props.twitter}
              github={props.github}
              stackoverflow={props.stackoverflow}
              reddit={props.reddit}
              linkedin={props.linkedin}
              indeed={props.indeed}
            />
          </div>
        </div>
      </div>
    </Box>
  );
}
