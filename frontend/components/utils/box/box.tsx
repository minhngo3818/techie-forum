import React, {
  ReactElement,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import styles from "./Box.module.css";

// Notes: cannot use dynamic style changing with current tailwind
// width, height properties are hardcode
// TODO: dynamic height for box
interface BoxType {
  height: number;
  width: number;
  borderWidth: number;
  borderColor?: String;
  align?: String;
  margin?: String;
  clipType: String;
  children: ReactElement;
}

function Box(props: BoxType) {
  let borderColor = !props.borderColor ? "bg-white" : props.borderColor;
  let align = !props.align ? "items-center" : props.align;
  let margin = !props.margin ? "my-0" : props.margin;

  return (
    <div
      id="outer-layer"
      className={
        styles.boxContainer +
        ` ${props.clipType} ${borderColor} ${align} ${margin}`
      }
      style={{
        maxWidth: props.width,
        width: "100%",
        height: "auto",
        padding: "1px 0.5px",
      }}
    >
      <div
        id="inner-layer"
        className={
          styles.boxWrapper + ` ${props.clipType} ${borderColor} ${align}`
        }
        style={{
          width: `calc(100% - ${2 * props.borderWidth}px)`,
          minHeight: props.height,
          height: "auto",
        }}
      >
        {props.children}
      </div>
    </div>
  );
}
export default Box;
