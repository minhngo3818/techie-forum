import PageHeader from "../components/PageHeader";
import Image from "next/image";
import styles from "../styles/About.module.css";

const About = () => {
  // Large about page title margin left 0
  // Divider under page title
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.aboutTitle}>
        <h1>About</h1>
      </div>
      <div className={styles.aboutDeveloper}>
        <div>
          <Image
            src="/../public/dev.jpg"
            alt="avatar"
            width={200}
            height={200}
          />
        </div>
        <div>
          <h3 className={styles.devName}>Hi! I'm Minh Tuyen Ngo</h3>
          <p className={styles.devAbout}>
            Software - Full Stack - Data Scientist
          </p>
          <ul className={styles.devContacts}>
            <li className={styles.devContacts}>Indeed</li>
            <li>Linkedin</li>
            <li>Github</li>
          </ul>
        </div>
      </div>
      <div className={styles.aboutwebsite}>
        <div className={styles.aboutOverview}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </div>
        <div className={styles.aboutFeatures}>
          <span className={styles.featureWebsite}>
            <h3>Website Features</h3>
            <ul>
              <li>Post a Thread</li>
              <li>Like & Share</li>
              <li>Leverage Reputation</li>
              <li>Expand Network</li>
              <li>Futuristic UI</li>
            </ul>
          </span>
          <span className={styles.featureTechStack}>
            <h3>Technologies Stack</h3>
            <ul>
              <li>JWT Authentication</li>
              <li>Rest Framework API</li>
              <li>Next JS</li>
              <li>React</li>
              <li>PosgreSQL Database</li>
              <li>AWS</li>
            </ul>
          </span>
        </div>
        <div className={styles.aboutEnd}><h3>Glad for Joining Lair 4 Techies!</h3></div>
      </div>
    </div>
  );
};

export default About;
