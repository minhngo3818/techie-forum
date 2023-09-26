import React, {
  ChangeEvent,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { Tab, Transition } from "@headlessui/react";
import AvatarEditor from "@components/utils/avatar-editor/avatar-editor";
import { Point } from "react-easy-crop";
import { ImageArea } from "@components/utils/avatar-editor/crop-image-helper";
import getCroppedImg from "@components/utils/avatar-editor/crop-image-helper";
import HorzField from "../../field-horizontal/horizontal-field";
import generalStyles from "../ProfileCreationForm.module.css";
import { CaretRightFilled } from "@components/icons/icons";
import { EventTargetNameValue } from "@interfaces/forum/form/form-field";

interface BasicInfoType {
  isShow: boolean;
  name: string;
  about: string;
  avatar: string;
  onChange: (event: EventTargetNameValue) => void;
  nextTab: () => void;
}

function BasicInfo(props: BasicInfoType) {
  const nameRef = useRef<HTMLInputElement>(null);
  const aboutRef = useRef<HTMLTextAreaElement>(null);
  const avatarRef = useRef<HTMLInputElement>(null);

  // Avatar editor
  const [avatar, setAvatar] = useState<string>("");
  const [avatarName, setAvatarName] = useState<string>("");
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedArea, setCroppedArea] = useState<ImageArea | null>(null);

  useEffect(() => {
    if (croppedArea) {
      getCroppedImg(avatar, croppedArea, rotation).then((value) => {
        if (value) {
          let avatarData = { target: { name: "avatar", value: value.file } };
          props.onChange(avatarData);
        }
      });
    }
  }, [crop, zoom, rotation, croppedArea, avatar, props]);

  const handleChangeImage = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        let avatarUrl = URL.createObjectURL(file);
        setAvatar(avatarUrl);
        setAvatarName(file.name);
        let avatarData = { target: { name: "avatar", value: file } };
        props.onChange(avatarData);
      }
    },
    [props]
  );

  return (
    <Tab.Panel as="div">
      <Transition
        as="div"
        appear
        show={props.isShow}
        enter="transition-all duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-all duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className={generalStyles.procrePanel}>
          <div className={generalStyles.procrePanelWrapper}>
            <Transition.Child
              as="div"
              className="w-full flex justify-center"
              enter="transition-all duration-300"
              enterFrom="opacity-0 -translate-x-[50px]"
              enterTo="opacity-100 -translate-x-0"
            >
              <HorzField
                innerRef={nameRef}
                label="Profile Name"
                name="profile_name"
                type="text"
                placeholder="Enter profile name"
                value={props.name}
                onChange={props.onChange}
                fieldType="input"
              />
            </Transition.Child>
            <Transition.Child
              as="div"
              className="w-full flex justify-center"
              enter="transition-all delay-100 duration-300"
              enterFrom="opacity-0 -translate-x-[50px]"
              enterTo="opacity-100 -translate-x-0"
            >
              <HorzField
                innerRef={aboutRef}
                label="About"
                name="about"
                placeholder="Enter about"
                value={props.about}
                onChange={props.onChange}
                fieldType="textarea"
                rows={4}
              />
            </Transition.Child>
            <Transition.Child
              as="div"
              className="w-full flex justify-center"
              enter="transition-all delay-200 duration-300"
              enterFrom="opacity-0 -translate-x-[50px]"
              enterTo="opacity-100 -translate-x-0"
            >
              <HorzField
                innerRef={avatarRef}
                label="Avatar"
                name="avatar"
                type="file"
                fileName={avatarName}
                onChange={handleChangeImage}
                fieldType="input"
              />
            </Transition.Child>
            <AvatarEditor
              avatar={avatar as string}
              zoom={zoom}
              setZoom={setZoom}
              rotation={rotation}
              setRotation={setRotation}
              crop={crop}
              setCrop={setCrop}
              croppedArea={croppedArea}
              setCroppedArea={setCroppedArea}
            />
          </div>
          <div className={generalStyles.procreChangeTabWrapper}>
            <button
              className={generalStyles.procreChangeTabBtn}
              onClick={props.nextTab}
            >
              Next
              <CaretRightFilled className={generalStyles.procreChangeTabIcon} />
            </button>
          </div>
        </div>
      </Transition>
    </Tab.Panel>
  );
}
export default BasicInfo;
