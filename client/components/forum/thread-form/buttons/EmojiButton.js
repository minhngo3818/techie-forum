import { OverlayTrigger, Button, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import styles from "../ThreadForm.module.css";

const EmojiButton = () => {
  return (
    <OverlayTrigger
      className={styles.overlayTrigger}
      placement="top"
      overlay={<Tooltip>Emojis</Tooltip>}
    >
      <Button className={styles.IconButton}>
        <FontAwesomeIcon icon={faFaceSmile} />
      </Button>
    </OverlayTrigger>
  );
};

export default EmojiButton;
