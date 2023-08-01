import dynamic from "next/dynamic";
import React, { useState, useRef, useEffect } from "react";
import Box from "../../utils/box/box";
import ProfileHeader from "./header/profile-header";
import ProfileIdentity from "./identity/profile-identity";
import ProfileStats from "./stats/profile-stats";
import { IProfile } from "../../../interfaces/profile/profile";
const ProfileGeneralsForm = dynamic(
  () => import("../../form/form-profile-generals/profile-general-form")
);
import styles from "./ProfileGeneralInfo.module.css";
import ProfileRefLinks from "./ref-links/profile-reflinks";

interface ProfileGeneralInfoType extends IProfile {
  isSameUser: boolean;
}

export default function ProfileGeneralInfo(props: ProfileGeneralInfoType) {
  const [isEdit, setEdit] = useState(false);

  const handleSetEdit = () => setEdit(!isEdit);

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
              <React.Fragment>
                <div className={styles.aboutEditWrapper}>
                  <button
                    className={styles.generalEditBtn}
                    onClick={handleSetEdit}
                  >
                    Edit
                  </button>
                </div>
                <ProfileGeneralsForm
                  profileName={props.profile_name}
                  twitter={props.twitter}
                  linkedin={props.linkedin}
                  github={props.github}
                  indeed={props.indeed}
                  reddit={props.reddit}
                  stackoverflow={props.stackoverflow}
                  headerTitle="General Infos"
                  icon="person"
                  handleIsShow={{ isState: isEdit, setState: handleSetEdit }}
                  // handleStateSubmit={props.handleChange}
                />
              </React.Fragment>
            )}
          </div>
          <div className={styles.genDetailCol}>
            <ProfileIdentity
              profileName={props.profile_name}
              avatar={
                !props.avatar ? "/default_avatar.png" : (props.avatar as string)
              }
              isEdit={isEdit}
            />
          </div>
          <div className={styles.genDetailCol}>
            <ProfileRefLinks
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
