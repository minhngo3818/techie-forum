import React, { useCallback, useState, useRef } from "react";
import Image from "next/image";
import PopupLayout from "../../../utils/popup-layout/popup-layout";
import AvatarEditor from "../../../utils/avatar-editor/avatar-editor";
import generalStyles from "../GeneralInfo.module.css";
import styles from "./ProfileIdentity.module.css";

interface ProfileIdentityType {
  isEdit: boolean;
  name: string;
  avatar: string;
  handleChange: () => void;
}

export default function ProfileIdentity(props: ProfileIdentityType) {
  const [name, setName] = useState(props.name);
  const nameRef = useRef<HTMLInputElement>(null);

  const [isEditAvatar, setIsEditAvatar] = useState(false);

  const avatar = "/made-in-heaven.jpg";

  const handleIsEditAvatar = useCallback(() => {
    setIsEditAvatar((isEditAvatar) => !isEditAvatar);
  }, []);

  return (
    <React.Fragment>
      <button
        className={`${styles.genAvatar} ${
          props.isEdit ? "border-white" : "border-gray"
        }`}
        disabled={!props.isEdit}
        onClick={handleIsEditAvatar}
      >
        <Image src={avatar} width={180} height={180} alt="avatar" />
      </button>
      <PopupLayout
        headerTitle="EDIT AVATAR"
        icon="edit"
        submitBtnName="CHANGE"
        handleShow={{ isState: isEditAvatar, setState: handleIsEditAvatar }}
        handleSubmit={props.handleChange}
      >
        <AvatarEditor avatar={avatar} />
      </PopupLayout>
      <input
        className={`${styles.genName} ${
          props.isEdit ? generalStyles.genOnEdit : generalStyles.genNotEdit
        }`}
        ref={nameRef}
        defaultValue={name}
        onChange={props.handleChange}
        disabled={!props.isEdit}
      />
    </React.Fragment>
  );
}
