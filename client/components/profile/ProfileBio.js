import styles from "../../styles/Profile.module.css";

const ProfileBio = () => {
  return (
    <div className={styles.widget}>
      <div className={styles.widgetHeader}>Bio</div>
      <div className={styles.widgetContent}>
        <p>Lorem ipsum</p>
      </div>
    </div>
  );
};

export default ProfileBio;
