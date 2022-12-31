import styles from "./LockOn.module.css";

interface LockOnWrapperType {
  width: number;
  height: number;
  title: String;
}

function LockOnWrapper(props: LockOnWrapperType) {
  return (
    <div
      className={styles.lockOnWrapper}
      style={{
        maxWidth: props.width,
        width: "100%",
        maxHeight: props.height,
        height: "100%",
      }}
    >
      <h2 className={styles.lockOnTitle}>Techies Forum</h2>
      <div className={styles.lockOnFrame}>
        <span className={`${styles.lockOnCorner} ${styles.lockOnRectTL}`} />
        <span className={`${styles.lockOnCorner} ${styles.lockOnRectTR}`} />
        <span className={`${styles.lockOnCorner} ${styles.lockOnRectBL}`} />
        <span className={`${styles.lockOnCorner} ${styles.lockOnRectBR}`} />
      </div>
    </div>
  );
}
export default LockOnWrapper;
