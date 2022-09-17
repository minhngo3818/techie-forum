import { OverlayTrigger, Button, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import styles from "../ThreadForm.module.css";

const ImageButton = () => {
  return (
    <OverlayTrigger
      className={styles.overlayTrigger}
      placement="top"
      overlay={<Tooltip>Upload Image</Tooltip>}
    >
      <Button className={styles.IconButton}>
        <FontAwesomeIcon icon={faImage} />
      </Button>
    </OverlayTrigger>
  );
};

export default ImageButton;
