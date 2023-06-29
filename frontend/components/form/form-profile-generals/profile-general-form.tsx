import React, { useState, useRef, ChangeEvent } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import { StateDuo } from "../../../interfaces/utils/button";
import BaseField from "../field-base/base-field";
import PopupLayout from "../../utils/popup-layout/popup-layout";
import { updateProfile } from "../../../services/user/profile/profile-services";

interface ProfileGeneralsType {
  headerTitle?: string;
  icon?: string;
  handleIsShow: StateDuo;
  profileName?: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
  indeed?: string;
  reddit?: string;
  stackoverflow?: string;
}

export default function ProfileGeneralsForm(props: ProfileGeneralsType) {
  const router = useRouter();

  const [generalsInfo, setGeneralInfo] = useState({
    profile_name: props.profileName,
    twitter: props.twitter,
    linkedin: props.linkedin,
    indeed: props.indeed,
    github: props.github,
    reddit: props.reddit,
    stackoverflow: props.stackoverflow,
  });

  const profileNameRef = useRef<HTMLInputElement>(null);
  const twitterRef = useRef<HTMLInputElement>(null);
  const linkedinRef = useRef<HTMLInputElement>(null);
  const githubRef = useRef<HTMLInputElement>(null);
  const redditRef = useRef<HTMLInputElement>(null);
  const stackoverflowRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGeneralInfo({ ...generalsInfo, [e.target.name]: e.target.value });
  };

  const handleUpdateInfo = async () => {
    let profileName = props.profileName ?? "";
    await updateProfile(profileName, generalsInfo);
    props.handleIsShow.setState();
    let newProfileName = generalsInfo.profile_name;
    router.push(`/profile/${newProfileName}`);
  };

  return (
    <PopupLayout
      headerTitle={props.headerTitle}
      icon={props.icon}
      handleShow={props.handleIsShow}
      handleSubmit={handleUpdateInfo}
    >
      <React.Fragment>
        <BaseField
          name="profile_name"
          label="Profile Name"
          innerRef={profileNameRef}
          isLightMode={true}
          placeholder="Lisa Guho"
          value={generalsInfo.profile_name}
          onChange={handleChange}
          type="text"
          fieldType="input"
        />
        <BaseField
          name="twitter"
          label="Twitter"
          innerRef={twitterRef}
          isLightMode={true}
          placeholder="https://twitter.com/adamsmith"
          value={generalsInfo.twitter}
          onChange={handleChange}
          type="url"
          fieldType="input"
        />
        <BaseField
          name="linkedin"
          label="Linkedin"
          innerRef={linkedinRef}
          isLightMode={true}
          placeholder="https://www.linkedin.com/adamsmith"
          value={generalsInfo.linkedin}
          onChange={handleChange}
          type="url"
          fieldType="input"
        />
        <BaseField
          name="github"
          label="Github"
          innerRef={githubRef}
          isLightMode={true}
          placeholder="https://github.com/adamsmith"
          value={generalsInfo.github}
          onChange={handleChange}
          type="url"
          fieldType="input"
        />
        <BaseField
          name="reddit"
          label="Reddit"
          innerRef={redditRef}
          isLightMode={true}
          placeholder="https://www.reddit.com/user/adamsmith"
          value={generalsInfo.reddit}
          onChange={handleChange}
          type="url"
          fieldType="input"
        />
        <BaseField
          name="stackoverflow"
          label="StackOverflow"
          innerRef={stackoverflowRef}
          isLightMode={true}
          placeholder="https://stackoverflow.com/adamsmith"
          value={generalsInfo.stackoverflow}
          onChange={handleChange}
          type="url"
          fieldType="input"
        />
      </React.Fragment>
    </PopupLayout>
  );
}
