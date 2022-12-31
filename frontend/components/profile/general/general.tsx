import React, { useState, useRef, useEffect, useCallback } from "react";
import Box from "../../utils/box/box";
import Image from "next/image";
import Stats from "./stats/stats";
import RefLinksForward from "./ref-links/ref-links";
import EditButton from "../../utils/buttons/edit-button/edit-button";
import { Dialog } from "@headlessui/react";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";
import styles from "./GeneralInfo.module.css";
import ProfileHeader from "./header/profile-header";

// Replace Popover with Diablog
function ProfileGeneral() {
  const [isEdit, setEdit] = useState(false);
  const [isEditAvatar, setEditAvatar] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEdit && nameRef.current != null && linkRef.current != null) {
      nameRef.current.focus();
      linkRef.current.focus();
    }
  });

  const handleEditAvatar = useCallback(() => {
    setEditAvatar((isEditAvatar) => !isEditAvatar);
  }, []);

  // replace with data
  const name = "Made In Heaven";

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
            <Stats thread={55} comment={100} reputation={800} />
            <EditButton isEdit={isEdit} onClick={() => setEdit(!isEdit)} />
          </div>
          <div className={styles.genDetailCol}>
            <button
              className={
                styles.gen2ndColImg +
                ` ${isEdit ? "border-white" : "border-gray"}`
              }
              disabled={!isEdit}
              onClick={handleEditAvatar}
            >
              <Image
                src="/made-in-heaven.jpg"
                width={180}
                height={180}
                alt="avatar"
              />
            </button>
            <input
              className={
                styles.gen2ndColName +
                ` ${isEdit ? styles.genOnEdit : styles.genNotEdit}`
              }
              ref={nameRef}
              defaultValue={name}
              disabled={!isEdit}
            />
          </div>
          <RefLinksForward
            ref={linkRef}
            isEdit={isEdit}
            twitter="https://twitter.com/konstancetine"
            github="https://github.com/konstancetine"
            stackoverflow="https://stackoverflow/konstancetine"
          />
        </div>
      </div>
    </Box>
  );
}
export default ProfileGeneral;
