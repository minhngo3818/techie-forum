import React, { useState, useCallback, ChangeEvent } from "react";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop";
import styles from "./AvatarEditor.module.css";

interface AvatarEditorType {
  isCenter?: boolean;
  avatar: string;
}

export default function AvatarEditor(props: AvatarEditorType) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const handleZoom = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setZoom(Number(e.target.value));
  }, []);

  const handleRotation = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setRotation(Number(e.target.value));
  }, []);

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
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={1 / 1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
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
                value={zoom}
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
                value={rotation}
                onChange={handleRotation}
              />
            </div>
          </div>
        </React.Fragment>
      )}
    </>
  );
}
