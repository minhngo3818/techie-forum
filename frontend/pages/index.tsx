import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import LockOnWrapper from "@components/utils/lock-on/lock-on";
const ParticleBackground = dynamic(
  () => import("@components/utils/particles/particle-background")
);
import styles from "@styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.homeWrapper}>
      <ParticleBackground />
      <LockOnWrapper width={500} height={80} title="Techies Forum" />
      <div className={styles.homeSlogan}>A lair for technomancers</div>
      <Link href={"/register"} className={styles.homeJoinBtn}>
        JOIN NOW
      </Link>
    </div>
  );
}
