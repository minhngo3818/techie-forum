import PropTypes from "prop-types";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import styles from "./HeaderButtons.module.css";

const HeaderButtons = (props) => {
  return (
    <div className={styles.buttonContainer}>
      <OverlayTrigger
        className={styles.button}
        placement="top"
        overlay={<Tooltip>{props.isEdit ? "Close" : "Edit"}</Tooltip>}
      >
        {props.isEdit ? (
          <Button
            type="button"
            className={styles.button}
            onClick={props.setIsEdit}
          >
            <FontAwesomeIcon icon={faXmark} />
          </Button>
        ) : (
          <Button
            type="button"
            className={styles.button}
            onClick={props.setIsEdit}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
        )}
      </OverlayTrigger>

      <div className={styles.decoration}>
        <p>&lt; &#9671; &gt;</p>
      </div>

      <OverlayTrigger
        className={styles.button}
        placement="top"
        overlay={<Tooltip>Unused</Tooltip>}
      >
        <Button
          type="button"
          className={styles.button}
          onClick={props.setIsEdit}
        >
          <FontAwesomeIcon icon={faXmark} />
        </Button>
      </OverlayTrigger>
    </div>
  );
};

export default HeaderButtons;

HeaderButtons.propTypes = {
  isEdit: PropTypes.func.isRequired,
  setIsEdit: PropTypes.func,
};
