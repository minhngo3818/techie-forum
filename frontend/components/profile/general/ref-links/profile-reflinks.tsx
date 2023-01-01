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
import RefLinksInterface from "../../../../interfaces/refLinks";

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

function EditLink({
  item,
  ref,
}: {
  item: LinkType;
  ref: React.Ref<HTMLInputElement>;
}) {
  return (
    <input
      ref={ref}
      className={styles.refLinkInput + ` ${!item.link && "italic"}`}
      defaultValue={item?.link}
      placeholder={item.name + " Url..."}
    />
  );
}

function ProfileRefLinks(
  props: RefLinksType,
  ref: React.Ref<HTMLInputElement>
) {
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
      name: "Indeed",
      link: props.indeed,
      icon: <Indeed className={styles.refLinkIcon} />,
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
              {!props.isEdit && <RenderLink item={link} />}
              {props.isEdit && <EditLink item={link} ref={ref} />}
            </div>
          );
        })}
      </div>
    </Box>
  );
}
const RefLinksForward = React.forwardRef(ProfileRefLinks);

export default RefLinksForward;
