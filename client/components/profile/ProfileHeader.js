import styles from "../../styles/Profile.module.css";

const ProfileHeader = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerUrls}>
        <a href="#">Twitter</a>
        <a href="#">Reddit</a>
        <a href="#">Stack Overflow</a>
        <a href="#">Linkedin</a>
        <a href="#">Indeed</a>
        <a href="#">Github</a>
      </div>
      <div className={styles.headerAvatar}>
        <div>
          <img alt="avatar"></img>
        </div>
        <h3>John Doe</h3>
      </div>
      <div className={styles.headerStats}>
        <p>Network: 999+</p>
        <p>Reputation: 999+</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
