import { style } from "@mui/system";
import { useState, useRef } from "react";
import { Form, Button, Carousel } from "react-bootstrap";
import PageHeader from "../../components/PageHeader";
import AuthGuard from "../../services/auth/AuthGuard";
import customBS from "../../styles/CustomBootstrap.module.css";
import styles from "../../styles/ProfileForm.module.css";

const refLinks = [
  { name: "Twitter", url: "https://twitter.com/your-username" },
  { name: "Reddit", url: "https://reddit.com/your-username" },
  { name: "Stackoverflow", url: "https://stackoverflow.com/your-username" },
  { name: "Linkedin", url: "https://linkedin.com/in/your-username" },
  { name: "Indeed", url: "https://indeed.com/your-username" },
  { name: "Github", url: "https://github.com/your-username" },
];

const ProfileCreate = () => {
  const displayNameRef = useRef();
  const bioRef = useRef();

  const [displayName, setDisplayName] = useState(null);
  const [bio, setBio] = useState(null);

  const [allowNextPage, setAllowNextPage] = useState(false);

  const handleNextPage = () => {
    if (displayName !== null && bio !== null) {
      setAllowNextPage(true);
    }
  };

  return (
    <div className={styles.container}>
      <PageHeader pageName="Create Your Profile" />
      <Form>
        <Carousel
          className={styles.carouselContainer}
          interval={null}
          controls={false}
          wrap={false}
        >
          <Carousel.Item className={styles.itemContainer}>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>Avatar</Form.Label>
              <Form.Control
                className={customBS.formControl}
                type="file"
              ></Form.Control>
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>Display Name</Form.Label>
              <Form.Control
                className={customBS.formControl}
                placeholder="display name"
                requrired
              ></Form.Control>
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>Bio</Form.Label>
              <Form.Control
                as="textarea"
                className={customBS.formControl}
                placeholder="Add your biography"
                rows={7}
              ></Form.Control>
            </Form.Group>
          </Carousel.Item>
          <Carousel.Item className={styles.itemContainer}>
            <div className={styles.linksContainer}></div>
            {refLinks.map((refLink) => {
              return (
                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.formLabel}>
                    {refLink.name}
                  </Form.Label>
                  <Form.Control
                    className={customBS.formControl}
                    placeholder={refLink.url}
                  ></Form.Control>
                </Form.Group>
              );
            })}
          </Carousel.Item>
          <Carousel.Item className={styles.itemContainer}>
            <Form.Group className={styles.submitSection}>
              <Form.Label className={styles.formLabel}>
                Have you finished ?
              </Form.Label>
              <Form.Label className={styles.formLabel}>
                Go back and change your info if you're not done yet
              </Form.Label>
              <Button type="submit" className={styles.submitButton}>
                Submit
              </Button>
            </Form.Group>
          </Carousel.Item>
        </Carousel>
      </Form>
    </div>
  );
};

export default AuthGuard(ProfileCreate);
