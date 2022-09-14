import { Modal, Button } from "react-bootstrap";
import { useState, useRef, useContext } from "react";
import AuthContext from "../../services/auth/AuthService";
import AvatarEditor from "react-avatar-editor";
import customBS from "../../styles/CustomBootstrap.module.css";
import styles from "../../styles/Profile.module.css";

const ProfileHeader = () => {
  const { profile } = useContext(AuthContext);
  const [editAvatar, setEditAvatar] = useState(false);

  // Edit avatar handlers
  const editor = useRef(null);
  const showEditAvatar = () => setEditAvatar(true);
  const closeEditAvatar = () => setEditAvatar(false);

  return (
    <div className={styles.header}>
      <div className={styles.headerUrls}>
        {profile !== null && profile.twitter_url !== null && (
          <a href={profile.twitter_url}>Twitter</a>
        )}
        {profile !== null && profile.reddit_url !== null && (
          <a href={profile.reddit_url}>Reddit</a>
        )}
        {profile !== null && profile.stackoverflow_url !== null && (
          <a href={profile.stackoverflow_url}>Stack Overflow</a>
        )}
        {profile !== null && profile.linkedin_url !== null && (
          <a href={profile.linkedin_url}>Linkedin</a>
        )}
        {profile !== null && profile.indeed_url !== null && (
          <a href={profile.indeed_url}>Indeed</a>
        )}
        {profile?.github_url !== null && (
          <a href={profile?.github_url}>Github</a>
        )}
      </div>
      <div className={styles.headerAvatar}>
        <img
          src={profile?.avatar}
          alt="avatar"
          type="button"
          onClick={showEditAvatar}
        />
        <Modal
          className={customBS.modalContent}
          show={editAvatar}
          onHide={closeEditAvatar}
        >
          <Modal.Body className={customBS.modalBody}>
            <AvatarEditor
              ref={editor}
              image={profile?.avatar}
              width={250}
              height={250}
              border={50}
              borderRadius={150}
              scale={1.2}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeEditAvatar}>
              Close
            </Button>
            <Button variant="primary">Save Changes</Button>
          </Modal.Footer>
        </Modal>

        <h3>{profile?.display_name}</h3>
      </div>
      <div className={styles.headerStats}>
        <p>Network: 999+</p>
        <p>Reputation: 999+</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
