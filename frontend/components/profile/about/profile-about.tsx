import React, { useState, useEffect, useRef, useCallback } from "react";
import Box from "../../utils/box/box";
import EditButton from "../../utils/buttons/edit-button/edit-button";
import useAutosizeTextArea from "../../../hooks/useAutosizeTextArea";
import styles from "./ProfileAbout.module.css";

function ProfileAbout(props: { about?: string; isSameUser: boolean }) {
  const [about, setAbout] = useState(props.about);
  const [isEdit, setEdit] = useState(false);
  const aboutRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(aboutRef.current, about);

  useEffect(() => {
    if (isEdit && aboutRef.current !== null) {
      aboutRef.current.focus();
    }
  });

  const handleChangeAbout = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAbout(event.target.value);
  };

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
            width={760}
            height={120}
            borderWidth={1}
            borderColor={isEdit ? "bg-white" : "bg-gray"}
            clipType="clip-opposite-corners-right"
          >
            <textarea
              className={styles.aboutContent}
              style={{ verticalAlign: "middle" }}
              ref={aboutRef}
              defaultValue={about}
              onChange={handleChangeAbout}
              disabled={!isEdit}
            />
          </Box>
        </div>
        {!props.isSameUser ? null : (
          <div className={styles.aboutEditWrapper}>
            <div className={styles.aboutEditBtn}>
              <EditButton isEdit={isEdit} onClick={() => setEdit(!isEdit)} />
            </div>
          </div>
        )}
      </div>
    </Box>
  );
}
export default ProfileAbout;
