import { useContext } from "react";
import AuthContext from "../../services/auth/AuthService";
import styles from "../../styles/Profile.module.css";

const ProfileHeader = () => {
  const { profile } = useContext(AuthContext);

  return (
    <div className={styles.header}>
      <div className={styles.headerUrls}>
        {profile.twitter_url !== null && (
          <a href={profile.twitter_url}>Twitter</a>
        )}
        {profile.reddit_url !== null && <a href={profile.reddit_url}>Reddit</a>}
        {profile.stackoverflow_url !== null && (
          <a href={profile.stackoverflow_url}>Stack Overflow</a>
        )}
        {profile.linkedin_url !== null && (
          <a href={profile.linkedin_url}>Linkedin</a>
        )}
        {profile.indeed_url !== null && <a href={profile.indeed_url}>Indeed</a>}
        {profile.github_url !== null && <a href={profile.github_url}>Github</a>}
      </div>
      <div className={styles.headerAvatar}>
        <div>
          <img src={profile.avatar} alt="avatar" />
        </div>
        <h3>{profile.display_name}</h3>
      </div>
      <div className={styles.headerStats}>
        <p>Network: 999+</p>
        <p>Reputation: 999+</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
