import React, { ChangeEvent, useState, useRef, useCallback } from "react";
import Image from "next/image";
import PopupLayout from "../../../utils/popup-layout/popup-layout";
import AvatarEditor from "../../../utils/avatar-editor/avatar-editor";
import { Point } from "react-easy-crop";
import getCroppedImg from "../../../utils/avatar-editor/crop-image-helper";
import { ImageArea } from "../../../utils/avatar-editor/crop-image-helper";
import { updateProfile } from "../../../../services/user/profile/profile-services";
import styles from "./ProfileIdentity.module.css";
import { useRouter } from "next/router";

interface ProfileIdentityType {
  isEdit: boolean;
  profileName: string | undefined;
  avatar: string;
}

export default function ProfileIdentity(props: ProfileIdentityType) {
  const router = useRouter();
  const originalAvatar = props.avatar;
  const [avatar, setAvatar] = useState<string>(props.avatar);
  const avatarRef = useRef<HTMLInputElement>(null);
  const [isEditAvatar, setIsEditAvatar] = useState(false);

  // Avatar Cropper
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedArea, setCroppedArea] = useState<ImageArea | null>(null);

  const handleIsEditAvatar = () => {
    setIsEditAvatar((isEditAvatar) => {
      if (isEditAvatar) {
        setAvatar(originalAvatar);
      }
      return !isEditAvatar;
    });
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setCroppedArea(null);
  };

  const handleSelectedAvatar = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        let avatarUrl = URL.createObjectURL(file);
        setAvatar(avatarUrl);
      }
    },
    [props.avatar]
  );

  const handleSubmit = async () => {
    try {
      if (!props.profileName) throw new Error("Missing profile name");
      if (!croppedArea) throw new Error("Blank cropped area");
      const croppedAvatar = await getCroppedImg(avatar, croppedArea, rotation);
      if (!croppedAvatar) throw new Error("Failed to crop image");
      await updateProfile(props.profileName, { avatar: croppedAvatar.file });
      setTimeout(() => {
        router.reload();
      }, 1500);
    } catch (e) {
      console.log(e);
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
        submitBtnName="Upload"
        handleShow={{ isState: isEditAvatar, setState: handleIsEditAvatar }}
        handleSubmit={handleSubmit}
      >
        <div className={styles.genChangeAvatarWrapper}>
          <AvatarEditor
            isCenter={true}
            avatar={avatar}
            zoom={zoom}
            setZoom={setZoom}
            rotation={rotation}
            setRotation={setRotation}
            crop={crop}
            setCrop={setCrop}
            croppedArea={croppedArea}
            setCroppedArea={setCroppedArea}
          />
          <input
            className="border border-white w-3/4 h-7 text-white"
            name="avatar"
            accept="image/jpeg,image/png,image/jpg"
            type="file"
            ref={avatarRef}
            onChange={handleSelectedAvatar}
          />
        </div>
      </PopupLayout>
      <p className={`${styles.genName}`}>{props.profileName}</p>
    </React.Fragment>
  );
}
