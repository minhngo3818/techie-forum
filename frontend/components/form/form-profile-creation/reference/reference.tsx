import React, { ChangeEvent } from "react";
import HorzField from "../../field-horizontal/horizontal-field";
import RefLinksInterface from "../../../../interfaces/profile/ref-links";
import { Tab, Transition } from "@headlessui/react";
import { CaretLeftFilled, CaretRightFilled } from "../../../icons/icons";
import generalStyles from "../ProfileCreationForm.module.css";

interface ProfileRefType extends RefLinksInterface {
  isShow: boolean;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  nextTab: () => void;
  prevTab: () => void;
}

export default function RefLinks(props: ProfileRefType) {
  return (
    <Tab.Panel as="div">
      <Transition
        as="div"
        appear
        show={props.isShow}
        enter="transition-all duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-all duration-300"
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
                label="Twitter"
                name="twitter"
                type="text"
                placeholder="https://twitter.com/CeasarZeppeli"
                value={props.twitter}
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
                label="Linkedin"
                name="linkedin"
                type="text"
                placeholder="https://linkedin.com/jotarok"
                value={props.linkedin}
                onChange={props.onChange}
                fieldType="input"
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
                label="Indeed"
                name="indeed"
                type="text"
                placeholder="https://indeed.com/speedwagon"
                value={props.indeed}
                onChange={props.onChange}
                fieldType="input"
              />
            </Transition.Child>
            <Transition.Child
              as="div"
              className="w-full flex justify-center"
              enter="transition-all delay-300 duration-300"
              enterFrom="opacity-0 -translate-x-[50px]"
              enterTo="opacity-100 -translate-x-0"
            >
              <HorzField
                label="Github"
                name="github"
                type="text"
                placeholder="https://github.com/emporio"
                value={props.github}
                onChange={props.onChange}
                fieldType="input"
              />
            </Transition.Child>
            <Transition.Child
              as="div"
              className="w-full flex justify-center"
              enter="transition-all delay-[400ms] duration-300"
              enterFrom="opacity-0 -translate-x-[50px]"
              enterTo="opacity-100 -translate-x-0"
            >
              <HorzField
                label="Reddit"
                name="reddit"
                type="text"
                placeholder="https://reddit.com/bruno-buchiarati"
                value={props.reddit}
                onChange={props.onChange}
                fieldType="input"
              />
            </Transition.Child>
            <Transition.Child
              as="div"
              className="w-full flex justify-center"
              enter="transition-all delay-500 duration-300"
              enterFrom="opacity-0 -translate-x-[50px]"
              enterTo="opacity-100 -translate-x-0"
            >
              <HorzField
                label="Stackoverflow"
                name="stackoverflow"
                type="text"
                placeholder="https://stackoverflow.com/yosuke-higashikata"
                value={props.stackoverflow}
                onChange={props.onChange}
                fieldType="input"
              />
            </Transition.Child>
          </div>
          <div className={generalStyles.procreChangeTabWrapper}>
            <button
              className={generalStyles.procreChangeTabBtn}
              onClick={props.prevTab}
            >
              <CaretLeftFilled className={generalStyles.procreChangeTabIcon} />
              Prev
            </button>
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
