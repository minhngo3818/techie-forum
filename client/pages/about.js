import PageHeader from "../components/PageHeader";
import styles from "../styles/About.module.css";

const About = () => {
  return (
    <>
      <PageHeader pageName="About" />;
      <div className={styles.aboutContainer}>
        <div className={styles.aboutDeveloper}>
          <img src="" alt="avatar" />
          <h3 className={styles.devName}>I'm Minh Tuyen Ngo</h3>
          <p className={styles.devAbout}>Software Developer</p>
          <span className={styles.devContacts}>
            <ul>
              <li>Indeed</li>
              <li>Linkedin</li>
              <li>Github</li>
            </ul>
          </span>
        </div>
        <div className={styles.aboutwebsite}>
          <div className={styles.aboutOverview}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
          </div>
          <div className={styles.aboutFeatures}>
            <span className={styles.featureTechStack}>
              <ul>
                <li>JWT Authentication</li>
                <li>Rest Framework API</li>
                <li>Next JS</li>
                <li>React</li>
                <li>PosgreSQL Database</li>
                <li>AWS</li>
              </ul>
            </span>
            <span className={styles.featureWebsite}>
              <ul>
                <li>Post a Thread</li>
                <li>Like & Share</li>
                <li>Leverage Reputation</li>
                <li>Expand Network</li>
                <li>Futuristic UI</li>
              </ul>
            </span>
          </div>
          <div className={styles.aboutEnd}>Glad for Joining Lair 4 Techies</div>
        </div>
      </div>
    </>
  );
};

export default About;
