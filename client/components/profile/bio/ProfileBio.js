import { useContext } from "react";
import AuthContext from "../../../services/auth/AuthService";
import styles from "../../../styles/Profile.module.css";

const ProfileBio = () => {
  const { profile } = useContext(AuthContext);

  return (
    <div className={styles.widget}>
      <div className={styles.widgetHeader}>Bio</div>
      <div className={styles.widgetContent}>
        <p>{profile?.bio}</p>
      </div>
    </div>
  );
};

export default ProfileBio;
