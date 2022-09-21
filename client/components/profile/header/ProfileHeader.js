import { useState, useRef, useContext, useEffect } from "react";
import AuthContext from "../../../services/auth/AuthService";
import RefLink from "./links/reference-links";
import HeaderButtons from "./button/header-buttons";
import {
  OverlayTrigger,
  Tooltip,
  Modal,
  Button,
  Col,
  Row,
} from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import AvatarEditor from "react-avatar-editor";
import customBS from "../../../styles/CustomBootstrap.module.css";
import styles from "../../../styles/Profile.module.css";

const ProfileHeader = () => {
  const { profile } = useContext(AuthContext);
  const [isEdit, setIsEdit] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [editAvatar, setEditAvatar] = useState(false);

  // Edit avatar handlers
  const [scale, setScale] = useState(1.0);
  const [rotate, setRotate] = useState(0);
  const showEditAvatar = () => setEditAvatar(true);
  const closeEditAvatar = () => setEditAvatar(false);

  const handleEditButton = () => {
    if (isEdit) {
      setIsEdit(false);
      console.log(isEdit);
    } else {
      setIsEdit(true);
      console.log(isEdit);
    }
  };

  useEffect(() => {
    if (profile !== null) {
      setIsProfile(true);
    } else {
      setIsProfile(false);
    }
  }, [profile]);

  return (
    <div className={styles.header}>
      <HeaderButtons isEdit={isEdit} setIsEdit={handleEditButton} />
      <div className={styles.headerContent}></div>
      <div className={styles.headerUrls}>
        <div className={styles.urlsGrid}>
          <div className={styles.urlsHalf}>
            <RefLink
              name="Twitter"
              urls={profile?.twitter_url}
              profile={isProfile}
              cssClass={styles.urlsLeftLink}
              cssID={styles.top}
            />
            <RefLink
              name="Reddit"
              urls={profile?.reddit_url}
              profile={isProfile}
              cssClass={styles.urlsLeftLink}
              cssID={styles.mid}
            />
            <RefLink
              name="StackoverFlow"
              urls={profile?.stackoverflow_url}
              profile={isProfile}
              cssClass={styles.urlsLeftLink}
              cssID={styles.bottom}
            />
          </div>
          <div className={styles.urlsHalf} id={styles.rightHalf}>
            <RefLink
              name="Linkedin"
              urls={profile?.linkedin_url}
              profile={isProfile}
              cssClass={styles.urlsRightLink}
              cssID={styles.top}
            />
            <RefLink
              name="Indeed"
              urls={profile?.indeed_url}
              profile={isProfile}
              cssClass={styles.urlsRightLink}
              cssID={styles.mid}
            />
            <RefLink
              name="Github"
              urls={profile?.github_url}
              profile={isProfile}
              cssClass={styles.urlsRightLink}
              cssID={styles.bottom}
            />
          </div>
        </div>
      </div>
      <div className={styles.headerAvatar}>
        <img
          className={styles.image}
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
                  onChange={(e) => setScale(e.target.valueAsNumber)}
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
                  onChange={(e) => setRotate(e.target.valueAsNumber)}
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
