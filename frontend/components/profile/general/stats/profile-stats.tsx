import Box from "../../../utils/box/box";
import styles from "./ProfileStats.module.css";

interface ProfileStatsType {
  thread: number;
  comment: number;
  reputation: number;
}

export default function ProfileStats(props: ProfileStatsType) {
  const stats = [
    {
      attr: "Thread",
      stat: props.thread,
    },
    {
      attr: "Comment",
      stat: props.comment,
    },
    {
      attr: "Reputation",
      stat: props.reputation,
    },
  ];

  return (
    <Box
      width={180}
      height={240}
      borderWidth={1}
      borderColor="bg-gray"
      align="items-around"
      margin="mb-8"
      clipType="clip-file-shape"
    >
      <div className={styles.statsWrapper}>
        {stats.map((item: { attr: string; stat: number }, index: number) => {
          return (
            <div key={index} className={styles.statsRow}>
              <h5 className={styles.statsNumber}>{item.stat}</h5>
              <div className={styles.statsAttrWrapper}>
                <h5 className={styles.statsAttr}>
                  {`${item.attr}${item.stat !== 1 ? "s" : ""}`}
                </h5>
              </div>
            </div>
          );
        })}
      </div>
    </Box>
  );
}
