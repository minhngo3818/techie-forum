import React from "react";
import Link from "next/link";
import Box from "../../../utils/box/box";
import {
  Twitter,
  Linkedin,
  Indeed,
  Github,
  Reddit,
  Stackoverflow,
} from "../../../icons/icons";
import styles from "./ProfileRefLinks.module.css";
import RefLinksInterface from "../../../../interfaces/profile/ref-links";

//TYPES
interface LinkType {
  name: string;
  link: string | undefined;
  icon: JSX.Element;
}

interface RefLinksType extends RefLinksInterface {
  isEdit: boolean;
}

// FUNCTIONS
function RenderLink({ item }: { item: LinkType }): JSX.Element {
  if (!item.link) {
    return <div className={styles.refLinkEmpty}></div>;
  }

  return (
    <>
      <Link href={item.link} className={styles.refLinkUrl}>
        {item.name}
      </Link>
      <div className={styles.refLinkDash}></div>
      {item.icon}
    </>
  );
}

export default function ProfileRefLinks(props: RefLinksType) {
  const links = [
    {
      name: "Twitter",
      link: props.twitter,
      icon: <Twitter className={styles.refLinkIcon} />,
    },
    {
      name: "Linkedin",
      link: props.linkedin,
      icon: <Linkedin className={styles.refLinkIcon} />,
    },
    {
      name: "Github",
      link: props.github,
      icon: <Github className={styles.refLinkIcon} />,
    },
    {
      name: "Reddit",
      link: props.reddit,
      icon: <Reddit className={styles.refLinkIcon} />,
    },
    {
      name: "S.O",
      link: props.stackoverflow,
      icon: <Stackoverflow className={styles.refLinkIcon} />,
    },
  ];

  return (
    <Box
      width={180}
      height={300}
      borderWidth={1}
      borderColor={!props.isEdit ? "bg-gray" : "bg-white"}
      align="items-around"
      clipType="clip-opposite-corners-right"
    >
      <div className={styles.refLinkWrapper}>
        {links.map((link: LinkType) => {
          return (
            <div key={link.name} className={styles.refLinkRow}>
              <RenderLink item={link} />
            </div>
          );
        })}
      </div>
    </Box>
  );
}
