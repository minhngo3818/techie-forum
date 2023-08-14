import React, { useRef, useCallback, ChangeEvent } from "react";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop";
import { ImageArea } from "./crop-image-helper";
import styles from "./AvatarEditor.module.css";

interface AvatarEditorType {
  isCenter?: boolean;
  avatar: string;
  zoom: number;
  setZoom: (value: number) => void;
  rotation: number;
  setRotation: (value: number) => void;
  crop: Point;
  setCrop: (value: Point) => void;
  croppedArea: ImageArea | null;
  setCroppedArea: (value: ImageArea | null) => void;
}

export default function AvatarEditor(props: AvatarEditorType) {
  const handleZoom = (e: ChangeEvent<HTMLInputElement>) => {
    props.setZoom(Number(e.target.value));
  };

  const handleRotation = (e: ChangeEvent<HTMLInputElement>) => {
    props.setRotation(Number(e.target.value));
  };

  const handleCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      props.setCroppedArea(croppedAreaPixels);
    },
    []
  );

  return (
    <>
      {props.avatar !== "" && (
        <React.Fragment>
          <div
            className={`${styles.avEditorWrapper} ${
              props.isCenter ? styles.avCenter : styles.avRight
            }`}
          >
            <div className={styles.avEditorCropper}>
              <Cropper
                image={props.avatar}
                crop={props.crop}
                zoom={props.zoom}
                rotation={props.rotation}
                aspect={1 / 1}
                onCropChange={props.setCrop}
                onZoomChange={props.setZoom}
                onCropComplete={handleCropComplete}
              />
            </div>
          </div>
          <div
            className={`${styles.avEditorToolWrapper}  ${
              props.isCenter ? styles.avCenter : styles.avRight
            }`}
          >
            <div className={styles.avEditorTool}>
              <h5 className={styles.avEditorToolLabel}>Zoom</h5>
              <input
                className={styles.avEditorToolInput}
                type="range"
                min={1}
                max={3}
                step={0.05}
                value={props.zoom}
                onChange={handleZoom}
              />
            </div>
            <div className={styles.avEditorTool}>
              <h5 className={styles.avEditorToolLabel}>Rotation</h5>
              <input
                className={styles.avEditorToolInput}
                type="range"
                min={0}
                max={360}
                step={0.05}
                value={props.rotation}
                onChange={handleRotation}
              />
            </div>
            {/* <div className={styles.avEditorTool}>
              <input
                className="border border-white w-3/4 h-7 text-white"
                name="avatar"
                accept="image/jpeg,image/png,image/jpg"
                type="file"
                ref={avatarRef}
                onChange={props.handleSelectedAvatar}
              />
            </div> */}
          </div>
        </React.Fragment>
      )}
    </>
  );
}
