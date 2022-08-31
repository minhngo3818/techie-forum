import { Form, FloatingLabel, Row, Col } from "react-bootstrap";
import PageHeader from "../components/PageHeader";

const Profile = () => {
  return (
    <>
      <PageHeader pageName="Register Form"></PageHeader>
      <Form>
        <FloatingLabel
          controlId="floatingInput"
          label="Username"
          className="mb-3"
        >
          <Form.Control type="text" placeholder="Username" />
        </FloatingLabel>
        <Row>
          <Col>
            <FloatingLabel
              controlId="floatingInput"
              label="First Name"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="First Name" />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel
              controlId="floatingInput"
              label="Last Name"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="Last Name" />
            </FloatingLabel>
          </Col>
        </Row>
        <FloatingLabel controlId="floatingInput" label="About Yourself">
          <Form.Control type="text" placeholder="About Yourself" />
        </FloatingLabel>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Add your avatar</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
      </Form>
    </>
  );
};

export default Profile;
