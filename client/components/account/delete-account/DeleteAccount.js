import { useState, useEffect, useRef } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import customBS from "../../../styles/CustomBootstrap.module.css";
import genericStyles from "../../../styles/Account.module.css";
import uniqueStyles from "./DeleteAccount.module.css";

const DeleteAccount = () => {
  const [isDelete, setIsDelete] = useState(false);

  const handleIsDelete = () => {
    if (isDelete) {
      setIsDelete(false);
    } else {
      setIsDelete(true);
    }
  };

  const handleDeleteAccount = () => {
    setIsDelete(false);
  };

  return (
    <div className={genericStyles.container}>
      <h4>Delete Account</h4>
      <Form className={uniqueStyles.container}>
        <Form.Label>
          You can recover your account by follow steps in the follow up email
        </Form.Label>
        <Form.Label>
          Or you can login again to create your new account
        </Form.Label>
        <Button
          type="button"
          className={genericStyles.btn}
          onClick={handleIsDelete}
        >
          Delete Account
        </Button>
        <Modal
          className={customBS.modelContent}
          show={isDelete}
          onHide={handleIsDelete}
        >
          <Modal.Header closeButton>
            <Modal.Title>WARNING</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleIsDelete}>
              Abort
            </Button>
            <Button variant="primary" onClick={handleDeleteAccount}>
              Delete it
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </div>
  );
};

export default DeleteAccount;
