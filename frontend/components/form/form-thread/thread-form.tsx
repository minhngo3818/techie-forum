import React, {
  useState,
  useCallback,
  useRef,
  ChangeEvent,
  MouseEvent,
} from "react";
import Image from "next/image";
import { EventTargetNameValue } from "../../../interfaces/forum/form/form-field";
import {
  ThreadBodyInterface,
  TagInterface,
} from "../../../interfaces/forum/post/post";
import BaseField from "../field-base/base-field";
import TagField from "../field-tag/tag-field";
import { useAddTag, useRemoveTag } from "../field-tag/function/handleTag";
import useAutosizeTextArea from "../../../hooks/useAutosizeTextArea";
import { Transition } from "@headlessui/react";
import { Emoji, Image as ImageIcon } from "../../icons/icons";
import { Tooltip } from "react-tooltip";
import "node_modules/react-tooltip/dist/react-tooltip.min.css";
import styles from "./ThreadForm.module.css";

interface ThreadFormType {
  isShow: boolean;
  category: string;
}

const initialState: ThreadBodyInterface = {
  title: "",
  content: "",
  images: [],
  tags: new Set() as Set<TagInterface>,
};

export default function ThreadForm(props: ThreadFormType) {
  const [thread, setThread] = useState(initialState);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(contentRef.current, thread.content);

  const preventEnterKey = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleChange = useCallback(
    ({ target: { name, value } }: EventTargetNameValue) => {
      setThread((thread) => ({ ...thread, [name]: value }));
    },
    []
  );

  const handleChangeImage = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        let newImages: string[] = [];
        for (let i = 0; i < event.target.files.length; i += 1) {
          newImages.push(URL.createObjectURL(event.target.files[i]));
        }
        setThread((thread) => ({ ...thread, images: newImages }));
      }
    },
    []
  );

  const handleAddTag = useAddTag(thread.tags, setThread);

  const handleRemoveTag = useRemoveTag(thread.tags, setThread);

  const handleOnSubmit = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      console.log(thread);
    },
    [thread]
  );

  return (
    // Wrapp transition with div
    <Transition
      as="div"
      className={styles.threadFormWrapper}
      show={props.isShow}
      unmount={false}
      enter="transition-all duration-300"
      enterFrom="opacity-0 scale-y-0"
      enterTo="opacity-100 scale-y-100"
      leave="transition-all duration-300"
      leaveFrom="opacity-100 scale-y-100"
      leaveTo="opacity-0 scale-y-0"
    >
      <form className={styles.threadForm} onKeyDown={preventEnterKey}>
        <div className={styles.threadFormTools}>
          <button id="emoji-btn" className={styles.threadFormTool}>
            <Tooltip
              anchorId="emoji-btn"
              content="Add Emoji"
              events={["hover"]}
            />
            <Emoji />
          </button>
          <label
            id="upload-img-btn"
            htmlFor="upload-img"
            className={styles.threadFormTool}
          >
            <Tooltip
              anchorId="upload-img-btn"
              content="Add Images"
              events={["hover"]}
            />
            <input
              id="upload-img"
              type="file"
              multiple
              className="hidden"
              onChange={handleChangeImage}
            />
            <ImageIcon />
          </label>
          <button
            type="button"
            className={styles.threadFormPostBtn}
            onClick={handleOnSubmit}
          >
            POST
          </button>
        </div>
        <BaseField
          innerRef={titleRef}
          label="Title"
          name="title"
          type="text"
          placeholder="Enter thread title"
          value={thread.title}
          onChange={handleChange}
          fieldType="input"
        />
        <BaseField
          innerRef={contentRef}
          label="Content"
          name="content"
          placeholder="What's going on?..."
          value={thread.content}
          onChange={handleChange}
          fieldType="textarea"
          rows={4}
        />
        {thread.images && thread.images.length > 0 && (
          <div className={styles.threadFormImages}>
            {thread.images?.map((image, index) => {
              return (
                <div key={index} className={styles.threadFormImage}>
                  <Image src={image} alt={`image-${index}`} fill />
                </div>
              );
            })}
          </div>
        )}
        <TagField
          tags={thread.tags}
          isLabel={true}
          onAdd={handleAddTag}
          onRemove={handleRemoveTag}
        />
      </form>
    </Transition>
  );
}
