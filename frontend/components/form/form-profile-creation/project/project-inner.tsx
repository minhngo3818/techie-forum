import React, { ChangeEvent, useRef } from "react";
import ProjectInterface from "../../../../interfaces/project/project";
import HorzField from "../../field-horizontal/horizontal-field";
import styles from "./Project.module.css";

interface ProjectInnerType extends ProjectInterface {
  onChange: (
    index: number,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function ProjectInner(props: ProjectInnerType) {
  const nameRef = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLTextAreaElement>(null);
  const demoRef = useRef<HTMLInputElement>(null);
  const repoRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.projectFieldsWrapper}>
      <HorzField
        innerRef={nameRef}
        label="Profile Title"
        name="title"
        type="text"
        placeholder="Enter project title"
        value={props.title}
        onChange={(event) => props.onChange(props.id, event)}
        fieldType="input"
      />
      <HorzField
        innerRef={summaryRef}
        label="Summary"
        name="summary"
        placeholder="Enter project summary"
        value={props.summary}
        onChange={(event) => props.onChange(props.id, event)}
        fieldType="textarea"
        rows={4}
      />
      <HorzField
        innerRef={demoRef}
        label="Demo"
        name="demo"
        type="text"
        placeholder="https://made-in-heaven.com"
        value={props.demo}
        onChange={(event) => props.onChange(props.id, event)}
        fieldType="input"
      />
      <HorzField
        innerRef={repoRef}
        label="Repository"
        name="repo"
        type="text"
        placeholder="https://github.com/jotarok/made-in-heaven"
        value={props.repo}
        onChange={(event) => props.onChange(props.id, event)}
        fieldType="input"
      />
    </div>
  );
}
