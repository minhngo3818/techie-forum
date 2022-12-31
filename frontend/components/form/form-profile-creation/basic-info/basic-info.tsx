import React, {
  ChangeEvent,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { Tab, Transition } from "@headlessui/react";
import AvatarEditor from "../../../utils/avatar-editor/avatar-editor";
import HorzField from "../../field-horizontal/horizontal-field";
import generalStyles from "../ProfileCreationForm.module.css";
import { CaretRightFilled } from "../../../icons/icons";

interface BasicInfoType {
  isShow: boolean;
  name: string;
  about: string;
  avatar: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  nextTab: () => void;
}

function BasicInfo(props: BasicInfoType) {
  const nameRef = useRef<HTMLInputElement>(null);
  const aboutRef = useRef<HTMLTextAreaElement>(null);
  const avatarRef = useRef<HTMLInputElement>(null);

  // Avatar editor
  const [avatar, setAvatar] = useState("");

  const handleChangeImage = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        let avatarUrl = URL.createObjectURL(event.target.files[0]);
        setAvatar(avatarUrl);
      }
    },
    []
  );

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, []);

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
                name="name"
                type="text"
                placeholder="Enter profile name"
                value={props.name}
                onChange={props.onChange}
                fieldType="input"
                required={true}
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
                onChange={handleChangeImage}
                fieldType="input"
              />
            </Transition.Child>
            <AvatarEditor avatar={avatar} />
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
