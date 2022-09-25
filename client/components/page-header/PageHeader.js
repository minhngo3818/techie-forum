import PropTypes from "prop-types";
import { Container } from "react-bootstrap";
import styles from "./PageHeader.module.css";

const PageHeader = (props) => {
  const pageName = props.pageName;
  return (
    <Container>
      <div className={styles.pageHeader}>
        <h3>{pageName}</h3>
      </div>
    </Container>
  );
};

export default PageHeader;

PageHeader.propTypes = {
  pageName: PropTypes.string,
};
