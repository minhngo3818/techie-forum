import React, {
  useState,
  useCallback,
  useRef,
  ChangeEvent,
  MouseEvent,
  useEffect,
} from "react";
import Image from "next/image";
import { EventTargetNameValue } from "@interfaces/forum/form/form-field";
import { IThreadBody, IThread } from "@interfaces/forum/post/post";

import BaseField from "../field-base/base-field";
import TagField from "../field-tag/tag-field";
import { useAddTag, useRemoveTag } from "../field-tag/function/handleTag";
import useAutosizeTextArea from "@hooks/useAutosizeTextArea";
import { Transition } from "@headlessui/react";
import { Emoji, ClosePixel, Image as ImageIcon } from "@components/icons/icons";
import { Tooltip } from "react-tooltip";
import { postThread } from "@services/forum/thread/thread-service";
import "node_modules/react-tooltip/dist/react-tooltip.min.css";
import styles from "./ThreadForm.module.css";

interface ThreadFormType {
  isShow: boolean;
  category: string;
  handleAddNewThread: (newThread: IThread) => void;
}

export default function ThreadForm(props: ThreadFormType) {
  const initialState: IThreadBody = {
    category: props.category,
    title: "",
    content: "",
    tags: [],
  };

  const [thread, setThread] = useState<IThreadBody>(initialState);
  const [reviewedImages, setReviewedImages] = useState<string[]>([]);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(contentRef.current, thread.content);

  useEffect(() => {
    setThread((thread) => ({ ...thread, category: props.category }));
  }, [props.category]);

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
        let imagesToReview: string[] = [];
        for (let i = 0; i < event.target.files.length; i += 1) {
          imagesToReview.push(URL.createObjectURL(event.target.files[i]));
        }

        setReviewedImages(imagesToReview);
        setThread((thread) => ({
          ...thread,
          images: event.target.files as FileList,
        }));
      }
    },
    []
  );

  const handleAddTag = useAddTag(thread.tags, setThread);

  const handleRemoveTag = useRemoveTag(thread.tags, setThread);

  const handleRemoveImage = (index: number) => {
    let newReviewedImages = reviewedImages;
    newReviewedImages.splice(index, 1);
    setReviewedImages(newReviewedImages);

    if (thread.images && thread.images instanceof FileList) {
      let newImageObjects = new DataTransfer();
      for (let i = 0; i < thread.images.length; i += 1) {
        if (i !== index) {
          newImageObjects.items.add(thread.images[i]);
        }
      }
      setThread({ ...thread, images: newImageObjects.files });
    }
  };

  const handleOnSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newThread = await postThread(thread);
    if (newThread) {
      setThread(initialState);
      props.handleAddNewThread(newThread);
    }
  };

  return (
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
              name="images"
              multiple
              accept="image/jpeg,image/png,image/jpg"
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
        {thread.images &&
          thread.images.length > 0 &&
          reviewedImages.length > 0 && (
            <div className={styles.threadFormImages}>
              {reviewedImages.map((image, index) => {
                return (
                  <div key={index} className={styles.threadFormImage}>
                    <button
                      type="button"
                      className={styles.threadFormImageRemoveBtn}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <ClosePixel />
                    </button>
                    <Image src={image as string} alt={`image-${index}`} fill />
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
