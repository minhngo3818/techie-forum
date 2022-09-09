import styles from "../../styles/Profile.module.css";

const ProfileBio = () => {
  return (
    <div className={styles.widget}>
      <div className={styles.widgetHeader}>Bio</div>
      <div className={styles.widgetContent}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
      </div>
    </div>
  );
};

export default ProfileBio;
