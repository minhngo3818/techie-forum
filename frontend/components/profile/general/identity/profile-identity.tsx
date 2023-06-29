import React, { ChangeEvent, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import PopupLayout from "../../../utils/popup-layout/popup-layout";
import AvatarEditor from "../../../utils/avatar-editor/avatar-editor";
import { uploadAvatar } from "../../../../services/user/profile/profile-services";
import styles from "./ProfileIdentity.module.css";
import { toast } from "react-toastify";

interface ProfileIdentityType {
  isEdit: boolean;
  profileName: string | undefined;
  avatar: string;
}

export default function ProfileIdentity(props: ProfileIdentityType) {
  const router = useRouter();
  const originalAvatar = props.avatar;
  const [avatar, setAvatar] = useState<string>(props.avatar);
  const [avatarFile, setAvatarFile] = useState<File>();
  const avatarRef = useRef<HTMLInputElement>(null);
  const [isEditAvatar, setIsEditAvatar] = useState(false);

  const handleIsEditAvatar = () => {
    setIsEditAvatar((isEditAvatar) => {
      if (isEditAvatar) {
        setAvatar(originalAvatar);
      }

      return !isEditAvatar;
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;
    let avatarUrl = URL.createObjectURL(selectedFiles?.[0]);
    setAvatar(avatarUrl);
    setAvatarFile(selectedFiles?.[0]);
  };

  // TODO: Working with change image scale, rotation
  const handleSubmit = async () => {
    let profileName = props.profileName ?? "";
    if (avatarFile) {
      const fd = new FormData();
      fd.append("avatar", avatarFile, avatarFile.name);
      await uploadAvatar(profileName, fd);
      setTimeout(() => {
        router.reload();
      }, 1500);
    } else {
      toast.error("Invalid image file");
    }
  };

  return (
    <React.Fragment>
      <button className={`${styles.genAvatar} `} onClick={handleIsEditAvatar}>
        <Image
          src={avatar}
          width={180}
          height={180}
          alt="avatar"
          priority={true}
        />
      </button>
      <PopupLayout
        headerTitle="EDIT AVATAR"
        icon="edit"
        submitBtnName="CHANGE"
        handleShow={{ isState: isEditAvatar, setState: handleIsEditAvatar }}
        handleSubmit={handleSubmit}
      >
        <div className={styles.genChangeAvatarWrapper}>
          <AvatarEditor isCenter={true} avatar={avatar} />
          <p>Something</p>
          <input
            className="border border-white w-3/4 h-7 text-white"
            name="avatar"
            accept="image/jpeg,image/png,image"
            type="file"
            ref={avatarRef}
            onChange={handleChange}
          />
        </div>
      </PopupLayout>
      <p className={`${styles.genName}`}>{props.profileName}</p>
    </React.Fragment>
  );
}
