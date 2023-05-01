import React, { useState } from "react";
import Box from "../../utils/box/box";
import AboutForm from "../../form/form-about/about-form";
import styles from "./ProfileAbout.module.css";

function ProfileAbout(props: {
  profileName?: string;
  about?: string;
  isSameUser: boolean;
}) {
  const [isEdit, setIsEdit] = useState(false);

  const handleSetEdit = () => setIsEdit(!isEdit);

  if (!props.about && !props.isSameUser) {
    return <></>;
  }

  return (
    <Box
      width={960}
      height={360}
      borderWidth={1}
      margin="my-10"
      clipType="clip-cyber-right"
    >
      <div className={styles.aboutWrapper}>
        <div className={styles.aboutTitleWrapper}>
          <div className={styles.aboutTitle}>
            <h3>About</h3>
            {/* Add loading bar */}
          </div>
        </div>
        <div className={styles.aboutContentWrapper}>
          <Box
            width={820}
            height={120}
            borderWidth={1}
            borderColor={"bg-gray"}
            clipType="clip-opposite-corners-right"
          >
            <p className={styles.aboutContent}>
              {props.about !== null
                ? props.about
                : "<Let them know more about you>"}
            </p>
          </Box>
        </div>
        {!props.isSameUser ? null : (
          <React.Fragment>
            <div className={styles.aboutEditWrapper}>
              <button
                className={styles.aboutEditBtn}
                onClick={() => setIsEdit(!isEdit)}
              >
                Edit
              </button>
            </div>
            <AboutForm
              headerTitle="About"
              icon="about"
              handleIsShow={{ isState: isEdit, setState: handleSetEdit }}
              profileName={props.profileName}
              about={props.about}
            />
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
export default ProfileAbout;
