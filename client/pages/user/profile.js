import { useState } from "react";
import AuthGuard from "../../services/auth/AuthGuard";
import PageHeader from "../../components/PageHeader";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileBio from "../../components/profile/ProfileBio";
import ProfilePorfolio from "../../components/profile/ProfilePorfolio";
import styles from "../../styles/Profile.module.css";

const Profile = () => {
  return (
    <div className={styles.profile}>
      <PageHeader pageName="Profile"></PageHeader>
      <ProfileHeader />
      <ProfileBio />
      <ProfilePorfolio />
    </div>
  );
};

export default AuthGuard(Profile);
