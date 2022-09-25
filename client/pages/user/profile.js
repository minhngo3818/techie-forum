import { useState } from "react";
import AuthGuard from "../../services/auth/AuthGuard";
import PageHeader from "../../components/page-header/PageHeader";
import ProfileHeader from "../../components/profile/header/ProfileHeader";
import ProfileBio from "../../components/profile/bio/ProfileBio";
import ProfilePorfolio from "../../components/profile/porfolio/ProfilePorfolio";
import styles from "../../styles/Profile.module.css";

const Profile = () => {
  return (
    <div className={styles.profile}>
      <ProfileHeader />
      <ProfileBio />
      <ProfilePorfolio />
    </div>
  );
};

export default AuthGuard(Profile);
