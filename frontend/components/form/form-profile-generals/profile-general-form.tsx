import React, { useState, useRef, ChangeEvent } from "react";
import Router from "next/router";
import { StateDuo } from "../../../interfaces/utils/button";
import BaseField from "../field-base/base-field";
import PopupLayout from "../../utils/popup-layout/popup-layout";
import { updateProfile } from "../../../services/user/profile/profile-services";

interface ProfileGeneralInfo {
  profileName?: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
  indeed?: string;
  reddit?: string;
  stackoverflow?: string;
}

interface ProfileGeneralsType extends ProfileGeneralInfo {
  headerTitle?: string;
  icon?: string;
  handleIsShow: StateDuo;
}

export default function ProfileGeneralsForm(props: ProfileGeneralsType) {
  const [generalsInfo, setGeneralInfo] = useState({
    profileName: props.profileName,
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
  const indeedRef = useRef<HTMLInputElement>(null);
  const githubRef = useRef<HTMLInputElement>(null);
  const redditRef = useRef<HTMLInputElement>(null);
  const stackoverflowRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGeneralInfo({ ...generalsInfo, [e.target.name]: e.target.value });
  };

  const handleUpdateAbout = async () => {
    await updateProfile(props.profileName ?? "", generalsInfo);
    props.handleIsShow.setState();
    Router.reload();
  };

  return (
    <PopupLayout
      headerTitle={props.headerTitle}
      icon={props.icon}
      handleShow={props.handleIsShow}
      handleSubmit={handleUpdateAbout}
    >
      <React.Fragment>
        <BaseField
          name="profile_name"
          innerRef={profileNameRef}
          isLightMode={true}
          placeholder="Lisa Guho"
          value={generalsInfo.profileName}
          defaultValue={generalsInfo.profileName}
          onChange={handleChange}
          type="text"
          fieldType="input"
        />
        <BaseField
          name="twitter"
          innerRef={twitterRef}
          isLightMode={true}
          placeholder="https://twitter.com/adamsmith"
          value={generalsInfo.twitter}
          defaultValue={generalsInfo.twitter}
          onChange={handleChange}
          type="url"
          fieldType="input"
        />
        <BaseField
          name="linkedin"
          innerRef={linkedinRef}
          isLightMode={true}
          placeholder="https://www.linkedin.com/adam-smith/"
          value={generalsInfo.linkedin}
          defaultValue={generalsInfo.linkedin}
          onChange={handleChange}
          type="url"
          fieldType="input"
        />
        <BaseField
          name="indeed"
          innerRef={indeedRef}
          isLightMode={true}
          placeholder="probablyyourcompany"
          value={generalsInfo.indeed}
          defaultValue={generalsInfo.indeed}
          onChange={handleChange}
          type="url"
          fieldType="input"
        />
        <BaseField
          name="github"
          innerRef={githubRef}
          isLightMode={true}
          placeholder="https://github.com/adamsmith"
          value={generalsInfo.github}
          defaultValue={generalsInfo.github}
          onChange={handleChange}
          type="url"
          fieldType="input"
        />
        <BaseField
          name="reddit"
          innerRef={redditRef}
          isLightMode={true}
          placeholder="https://www.reddit.com/user/Adam-Smith/"
          value={generalsInfo.reddit}
          defaultValue={generalsInfo.reddit}
          onChange={handleChange}
          type="url"
          fieldType="input"
        />
        <BaseField
          name="stackoverflow"
          innerRef={stackoverflowRef}
          isLightMode={true}
          placeholder="https://stackoverflow.com/users/124232/adamsmith"
          value={generalsInfo.stackoverflow}
          defaultValue={generalsInfo.stackoverflow}
          onChange={handleChange}
          type="url"
          fieldType="input"
        />
      </React.Fragment>
    </PopupLayout>
  );
}
