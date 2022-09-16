import { useState, useRef, useContext, useEffect } from "react";
import AuthContext from "../../services/auth/AuthService";
import { Modal, Button, Col, Row } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import AvatarEditor from "react-avatar-editor";
import customBS from "../../styles/CustomBootstrap.module.css";
import styles from "../../styles/Profile.module.css";
import { style } from "@mui/system";

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
          <div className={styles.urlsHalf}>
            <div className={styles.urlsLeftLink} id={styles.top}>
              <p>
                {profile !== null && profile.twitter_url !== null && (
                  <a href={profile.twitter_url}>Twitter</a>
                )}
              </p>
            </div>
            <div className={styles.urlsLeftLink} id={styles.mid}>
              <p>
                {profile !== null && profile.reddit_url !== null && (
                  <a href={profile.reddit_url}>Reddit</a>
                )}
              </p>
            </div>
            <div className={styles.urlsLeftLink} id={styles.bottom}>
              <p>
                {profile !== null && profile.stackoverflow_url !== null && (
                  <a href={profile.stackoverflow_url}>Stackoverflow</a>
                )}
              </p>
            </div>
          </div>
          <div className={styles.urlsHalf} id={styles.rightHalf}>
            <div
              className={
                profile !== null && profile.linkedin_url !== null
                  ? styles.urlsRightLink
                  : null
              }
              id={styles.top}
            >
              <p>
                {profile !== null && profile.linkedin_url !== null && (
                  <a href={profile.linkedin_url}>Linkedin</a>
                )}
              </p>
            </div>
            <div
              className={
                profile !== null && profile.indeed_url !== null
                  ? styles.urlsRightLink
                  : null
              }
              id={styles.mid}
            >
              <p>
                {profile !== null && profile.indeed_url !== null && (
                  <a href={profile.indeed_url}>Indeed</a>
                )}
              </p>
            </div>
            <div
              className={
                profile !== null && profile.github_url !== null
                  ? styles.urlsRightLink
                  : null
              }
              id={styles.bottom}
            >
              <p>
                {profile !== null && profile.github_url !== null && (
                  <a href={profile.github_url}>Github</a>
                )}
              </p>
            </div>
          </div>
        </div>
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
