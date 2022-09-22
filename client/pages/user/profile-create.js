import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import AuthGuard from "../../services/auth/AuthGuard";
import UserServices from "../../services/user/UserServices";
import { toast } from "react-toastify";
import { Form, Button, Carousel } from "react-bootstrap";
import PageHeader from "../../components/PageHeader";
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
  const router = useRouter();

  const formRef = useRef();
  const [formInput, setFormInput] = useState({
    display_name: "",
    bio: "",
    avatar: null,
    twitter_url: "",
    reddit_url: "",
    stackoverflow_url: "",
    github_url: "",
    linkedin_url: "",
    indeed_url: "",
  });

  useEffect(() => {
    formRef.current.focus();
  }, []);

  const handleSubmitProfile = (e) => {
    e.preventDefault();
    if (formInput.display_name !== "") {
      const authObj = JSON.parse(localStorage.getItem("tf_auth"));

      // Send only inputed field
      let sendInputs = formInput;
      for (const property in sendInputs) {
        if (sendInputs[property] === "" || sendInputs[property] === null) {
          delete sendInputs[property];
        }
      }

      // SendInputs properties must be in-order same as serializer in backend
      let response = UserServices.createProfile(sendInputs, authObj.access);
      
      if (response) {
        localStorage.setItem("tf_profile", JSON.stringify(response?.data));
        router.replace("/");
      }
    } else {
      toast.warn("Display Name must be filled", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
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
                onChange={(e) =>
                  setFormInput({ ...formInput, avatar: e.target.files[0] })
                }
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
                requrired="true"
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
                type="button"
                className={styles.submitButton}
                onClick={handleSubmitProfile}
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
