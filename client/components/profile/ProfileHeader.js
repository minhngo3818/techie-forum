import { useState, useRef, useContext, useEffect } from "react";
import AuthContext from "../../services/auth/AuthService";
import { Modal, Button, Col, Row } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import AvatarEditor from "react-avatar-editor";
import customBS from "../../styles/CustomBootstrap.module.css";
import styles from "../../styles/Profile.module.css";

const ProfileHeader = () => {
  const { profile } = useContext(AuthContext);
  const [editAvatar, setEditAvatar] = useState(false);

  // Edit avatar handlers
  const [scale, setScale] = useState(parseFloat(1.0).toFixed(2));
  const [rotate, setRotate] = useState(parseInt(0));
  const showEditAvatar = () => setEditAvatar(true);
  const closeEditAvatar = () => setEditAvatar(false);
  const handleValue = (e) => {
    scaleRef.current = e.target.value;
  };

  return (
    <div className={styles.header}>
      <div className={styles.headerUrls}>
        <div className={styles.urlsGrid}>
          {profile !== null && profile.twitter_url !== null && (
            <a href={profile.twitter_url}>Twitter</a>
          )}
          {profile !== null && profile.reddit_url !== null && (
            <a id={styles.right} href={profile.reddit_url}>
              Reddit
            </a>
          )}
          {profile !== null && profile.stackoverflow_url !== null && (
            <a href={profile.stackoverflow_url}>Stack Overflow</a>
          )}
          {profile !== null && profile.linkedin_url !== null && (
            <a id={styles.right} href={profile.linkedin_url}>
              Linkedin
            </a>
          )}
          {profile !== null && profile.indeed_url !== null && (
            <a href={profile.indeed_url}>Indeed</a>
          )}
          {profile?.github_url !== null && (
            <a id={styles.right} href={profile?.github_url}>
              Github
            </a>
          )}
        </div>
      </div>
      2
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
              image={profile?.avatar}
              width={250}
              height={250}
              border={50}
              borderRadius={150}
              scale={scale}
              rotate={rotate}
            />
            <Row className={styles.avatarEditRow}>
              <Col className={styles.avatarEdit}>
                <p>Zoom: {scale}</p>
              </Col>
              <Col xs={8}>
                <RangeSlider
                  variant="dark"
                  value={scale}
                  max={2.5}
                  min={1.0}
                  step={0.05}
                  onChange={(e) => setScale(e.target.value)}
                  tooltip="off"
                />
              </Col>
            </Row>
            <Row className={styles.avatarEditRow}>
              <Col className={styles.avatarEdit}>
                <p>Rotate: {rotate}&deg;</p>
              </Col>
              <Col xs={8}>
                <RangeSlider
                  variant="dark"
                  value={rotate}
                  max={360}
                  min={0}
                  step={1}
                  onChange={(e) => setRotate(e.target.value)}
                  tooltip="off"
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeEditAvatar}>
              Close
            </Button>
            <Button variant="dark">Save Changes</Button>
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
