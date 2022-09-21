import { ConstructionOutlined } from "@mui/icons-material";
import { style } from "@mui/system";
import { useState, useEffect, useRef } from "react";
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
  const formRef = useRef();

  const [formInput, setFormInput] = useState({
    avatar: none,
    display_name: null,
    bio: null,
    twitter_url: null,
    reddit_url: null,
    stackoverflow_url: null,
    linkedin_url: null,
    indeed_url: null,
    github_url: null,
  });

  useEffect(() => {
    formInput.current.focus();
  }, []);

  const handleCreateProfile = () => {
    formInput.map((member) => {
      console.log(member);
    });
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
                onChange={(e) =>
                  setFormInput({ ...formInput, avatar: e.target.value })
                }
                value={formInput.avatar}
                ref={formRef}
              ></Form.Control>
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>Display Name</Form.Label>
              <Form.Control
                className={customBS.formControl}
                placeholder="display name"
                onChange={(e) =>
                  setFormInput({ ...formInput, display_name: e.target.value })
                }
                value={formInput.display_name}
                ref={formRef}
                requrired
              ></Form.Control>
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>Bio</Form.Label>
              <Form.Control
                as="textarea"
                className={customBS.formControl}
                placeholder="Add your biography"
                onChange={(e) =>
                  setFormInput({ ...formInput, bio: e.target.value })
                }
                value={formInput.bio}
                rows={7}
                ref={formRef}
              ></Form.Control>
            </Form.Group>
          </Carousel.Item>
          <Carousel.Item className={styles.itemContainer}>
            <div className={styles.linksContainer}></div>
            {refLinks.map((refLink, index) => {
              return (
                <Form.Group key={index} className={styles.formGroup}>
                  <Form.Label className={styles.formLabel}>
                    {refLink.name}
                  </Form.Label>
                  <Form.Control
                    className={customBS.formControl}
                    placeholder={refLink.url}
                    onChange={(e) =>
                      setFormInput({
                        ...formInput,
                        [refLink.name.toLowerCase() + "_url"]: e.target.value,
                      })
                    }
                    value={formInput[refLink.name.toLowerCase() + "_url"]}
                    ref={formRef}
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
              <Button
                type="submit"
                className={styles.submitButton}
                onClick={handleCreateProfile}
              >
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
