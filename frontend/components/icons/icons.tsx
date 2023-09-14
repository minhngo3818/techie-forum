import React, { SVGProps } from "react";

export function Emoji(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M20 12a8 8 0 0 0-8-8a8 8 0 0 0-8 8a8 8 0 0 0 8 8a8 8 0 0 0 8-8m2 0a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2a10 10 0 0 1 10 10M10 9.5c0 .8-.7 1.5-1.5 1.5S7 10.3 7 9.5S7.7 8 8.5 8s1.5.7 1.5 1.5m7 0c0 .8-.7 1.5-1.5 1.5S14 10.3 14 9.5S14.7 8 15.5 8s1.5.7 1.5 1.5m-5 7.73c-1.75 0-3.29-.73-4.19-1.81L9.23 14c.45.72 1.52 1.23 2.77 1.23s2.32-.51 2.77-1.23l1.42 1.42c-.9 1.08-2.44 1.81-4.19 1.81Z"
      ></path>
    </svg>
  );
}

export function Diamond(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path fill="currentColor" d="m19 12l-7 10l-7-10l7-10"></path>
    </svg>
  );
}

export function Image(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M19 19H5V5h14m0-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-5.04 9.29l-2.75 3.54l-1.96-2.36L6.5 17h11l-3.54-4.71Z"
      ></path>
    </svg>
  );
}

export function Menu(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"
      ></path>
    </svg>
  );
}

export function Warning(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
      <path
        fill="currentColor"
        d="M464 720a48 48 0 1 0 96 0a48 48 0 1 0-96 0zm16-304v184c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V416c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8zm475.7 440l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zm-783.5-27.9L512 239.9l339.8 588.2H172.2z"
      ></path>
    </svg>
  );
}

export function Robot(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
      <path
        fill="currentColor"
        d="M300 328a60 60 0 1 0 120 0a60 60 0 1 0-120 0zM852 64H172c-17.7 0-32 14.3-32 32v660c0 17.7 14.3 32 32 32h680c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32zm-32 660H204V128h616v596zM604 328a60 60 0 1 0 120 0a60 60 0 1 0-120 0zm250.2 556H169.8c-16.5 0-29.8 14.3-29.8 32v36c0 4.4 3.3 8 7.4 8h729.1c4.1 0 7.4-3.6 7.4-8v-36c.1-17.7-13.2-32-29.7-32zM664 508H360c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h304c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"
      ></path>
    </svg>
  );
}

export function AddSquare(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9 12h3m3 0h-3m0 0V9m0 3v3m9-11.4v16.8a.6.6 0 0 1-.6.6H3.6a.6.6 0 0 1-.6-.6V3.6a.6.6 0 0 1 .6-.6h16.8a.6.6 0 0 1 .6.6Z"
      ></path>
    </svg>
  );
}

export function CheckCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10zm0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16zm-.997-4L6.76 11.757l1.414-1.414l2.829 2.829l5.656-5.657l1.415 1.414L11.003 16z"
      ></path>
    </svg>
  );
}

export function CloseCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10zm0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16zm0-9.414l2.828-2.829l1.415 1.415L13.414 12l2.829 2.828l-1.415 1.415L12 13.414l-2.828 2.829l-1.415-1.415L10.586 12L7.757 9.172l1.415-1.415L12 10.586z"
      ></path>
    </svg>
  );
}

export function ClosePixel(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M5 3H3v18h18V3H5zm14 2v14H5V5h14zm-8 4H9V7H7v2h2v2h2v2H9v2H7v2h2v-2h2v-2h2v2h2v2h2v-2h-2v-2h-2v-2h2V9h2V7h-2v2h-2v2h-2V9z"
      ></path>
    </svg>
  );
}

export function Delete(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 2048 2048" {...props}>
      <path
        fill="currentColor"
        d="M1792 384h-128v1472q0 40-15 75t-41 61t-61 41t-75 15H448q-40 0-75-15t-61-41t-41-61t-15-75V384H128V256h512V128q0-27 10-50t27-40t41-28t50-10h384q27 0 50 10t40 27t28 41t10 50v128h512v128zM768 256h384V128H768v128zm768 128H384v1472q0 26 19 45t45 19h1024q26 0 45-19t19-45V384zM768 1664H640V640h128v1024zm256 0H896V640h128v1024zm256 0h-128V640h128v1024z"
      ></path>
    </svg>
  );
}

export function CaretLeftFilled(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M15 17.898c0 1.074-1.265 1.648-2.073.941l-6.31-5.522a1.75 1.75 0 0 1 0-2.634l6.31-5.522c.808-.707 2.073-.133 2.073.941v11.796Z"
      ></path>
    </svg>
  );
}

export function CaretRightFilled(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M9 17.898c0 1.074 1.265 1.648 2.073.941l6.31-5.522a1.75 1.75 0 0 0 0-2.634l-6.31-5.522C10.265 4.454 9 5.028 9 6.102v11.796Z"
      ></path>
    </svg>
  );
}

export function ThumbUpOutline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M18 21H7V8l7-7l1.25 1.25q.175.175.288.475q.112.3.112.575v.35L14.55 8H21q.8 0 1.4.6q.6.6.6 1.4v2q0 .175-.05.375t-.1.375l-3 7.05q-.225.5-.75.85T18 21Zm-9-2h9l3-7v-2h-9l1.35-5.5L9 8.85ZM9 8.85V19ZM7 8v2H4v9h3v2H2V8Z"
      ></path>
    </svg>
  );
}

export function ThumbUp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M18 21H8V8l7-7l1.25 1.25q.175.175.288.475q.112.3.112.575v.35L15.55 8H21q.8 0 1.4.6q.6.6.6 1.4v2q0 .175-.038.375q-.037.2-.112.375l-3 7.05q-.225.5-.75.85T18 21ZM6 8v13H2V8Z"
      ></path>
    </svg>
  );
}

export function CheckBoxOutline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="m10.6 16.2l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4ZM5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h14q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21Zm0-2h14V5H5v14ZM5 5v14V5Z"
      ></path>
    </svg>
  );
}

export function CheckBox(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="m10.6 16.2l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4ZM5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h14q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21Z"
      ></path>
    </svg>
  );
}

export function EditOutline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M5 19h1.4l8.625-8.625l-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2L17.875 1.9L22.1 6.125ZM3 21v-4.25l10.6-10.6l4.25 4.25L7.25 21ZM14.325 9.675l-.7-.7l1.4 1.4Z"
      ></path>
    </svg>
  );
}

export function Edit(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="m19.3 8.925l-4.25-4.2L17.875 1.9L22.1 6.125ZM3 21v-4.25l10.6-10.6l4.25 4.25L7.25 21Z"
      ></path>
    </svg>
  );
}

export function ReplyOutline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M19 10v9h-2v-7H6.828l3.95 3.95l-1.414 1.414L3 11l6.364-6.364l1.414 1.414L6.828 10H19Z"
      ></path>
    </svg>
  );
}

export function Reply(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M19 10v9h-2v-7H9.414v5.414L3 11l6.414-6.414V10H19Z"
      ></path>
    </svg>
  );
}

export function PostThreadOutline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M19 19V5H5v14h14m0-16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-2.3 6.35l-1 1l-2.05-2.05l1-1c.21-.22.56-.22.77 0l1.28 1.28c.22.21.22.56 0 .77M7 14.94l6.06-6.06l2.06 2.06L9.06 17H7v-2.06Z"
      ></path>
    </svg>
  );
}

export function PostThread(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-2.3 6.35c.22-.21.22-.56 0-.77L15.42 7.3a.532.532 0 0 0-.77 0l-1 1l2.05 2.05l1-1M7 14.94V17h2.06l6.06-6.06l-2.06-2.06L7 14.94Z"
      ></path>
    </svg>
  );
}

export function MarkedListOutline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      >
        <path
          strokeLinejoin="round"
          d="M6 15.8L7.143 17L10 14M6 8.8L7.143 10L10 7"
        ></path>
        <path d="M13 9h5m-5 7h5m4-4c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464c.974.974 1.3 2.343 1.41 4.536"></path>
      </g>
    </svg>
  );
}

export function MarkedList(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M3.464 3.464C2 4.93 2 7.286 2 12c0 4.714 0 7.071 1.464 8.535C4.93 22 7.286 22 12 22c4.714 0 7.071 0 8.535-1.465C22 19.072 22 16.714 22 12s0-7.071-1.465-8.536C19.072 2 16.714 2 12 2S4.929 2 3.464 3.464Zm7.08 4.053a.75.75 0 1 0-1.087-1.034l-2.314 2.43l-.6-.63a.75.75 0 1 0-1.086 1.034l1.143 1.2a.75.75 0 0 0 1.086 0l2.857-3ZM13 8.25a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5h-5Zm-2.457 6.267a.75.75 0 1 0-1.086-1.034l-2.314 2.43l-.6-.63a.75.75 0 1 0-1.086 1.034l1.143 1.2a.75.75 0 0 0 1.086 0l2.857-3ZM13 15.25a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5h-5Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export function SearchOutline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M11.5 16c.87 0 1.69-.26 2.38-.7l2.44 2.44l1.42-1.42l-2.44-2.43A4.481 4.481 0 0 0 11.5 7C9 7 7 9 7 11.5S9 16 11.5 16m0-7a2.5 2.5 0 0 1 0 5a2.5 2.5 0 0 1 0-5M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 14H4V6h16v12Z"
      ></path>
    </svg>
  );
}

export function Search(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M11.5 9a2.5 2.5 0 0 0 0 5a2.5 2.5 0 0 0 0-5M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m-3.21 14.21l-2.91-2.91c-.69.44-1.51.7-2.38.7C9 16 7 14 7 11.5S9 7 11.5 7a4.481 4.481 0 0 1 3.8 6.89l2.91 2.9l-1.42 1.42Z"
      ></path>
    </svg>
  );
}

export function CommentOutline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M9 22a1 1 0 0 1-1-1v-3H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6.1l-3.7 3.71c-.2.19-.45.29-.7.29H9m1-6v3.08L13.08 16H20V4H4v12h6Z"
      ></path>
    </svg>
  );
}

export function Comment(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M9 22a1 1 0 0 1-1-1v-3H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6.1l-3.7 3.71c-.2.19-.45.29-.7.29H9Z"
      ></path>
    </svg>
  );
}

// Media
export function Twitter(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props}>
      <path
        fill="currentColor"
        d="M247.4 68.9A8 8 0 0 0 240 64h-30.4a47.8 47.8 0 0 0-75.2-10.1A47.7 47.7 0 0 0 120 88v6.1C79.3 83.5 46 50.7 45.7 50.3a8 8 0 0 0-8.1-1.9a8.1 8.1 0 0 0-5.5 6.2c-8.7 48.2 5.8 80.5 19.5 99.1a108.6 108.6 0 0 0 24.7 24.4c-15.3 17.3-38.9 26.3-39.1 26.4a8 8 0 0 0-3.9 11.9c.8 1.2 3.8 5.1 11.1 8.8c9.1 4.5 21.1 6.8 35.6 6.8c70.5 0 129.5-54.3 135.5-124.2l30.2-30.1a8.4 8.4 0 0 0 1.7-8.8Zm-45.3 29.7a7.8 7.8 0 0 0-2.3 5.2C195.7 166.7 143.1 216 80 216c-10.6 0-18-1.4-23.2-3.1c11.5-6.2 27.5-17 37.9-32.5a8 8 0 0 0 1-6.4a8.1 8.1 0 0 0-4.1-5.1c-.1-.1-14.9-7.8-27.6-25.3c-14.4-19.8-20.5-43.9-18.1-71.7c15.8 13 46 34.2 80.8 40a8.1 8.1 0 0 0 6.5-1.8a8.2 8.2 0 0 0 2.8-6.1V88a32 32 0 0 1 61.3-12.8a8.1 8.1 0 0 0 7.4 4.8h16Z"
      ></path>
    </svg>
  );
}

export function Linkedin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props}>
      <path
        fill="currentColor"
        d="M100 80a12 12 0 1 1-12-12a12 12 0 0 1 12 12Zm128-36v168a16 16 0 0 1-16 16H44a16 16 0 0 1-16-16V44a16 16 0 0 1 16-16h168a16 16 0 0 1 16 16Zm-16 168V44H44v168ZM88 104a8 8 0 0 0-8 8v64a8 8 0 0 0 16 0v-64a8 8 0 0 0-8-8Zm60 0a36 36 0 0 0-20.2 6.2A8 8 0 0 0 112 112v64a8 8 0 0 0 16 0v-36a20 20 0 0 1 40 0v36a8 8 0 0 0 16 0v-36a36 36 0 0 0-36-36Z"
      ></path>
    </svg>
  );
}

export function Indeed(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M11.566 21.563v-8.762c.255.023.5.035.758.035c1.223 0 2.374-.32 3.35-.893v9.618c0 .822-.195 1.429-.575 1.834c-.378.403-.88.605-1.491.605c-.6 0-1.077-.202-1.468-.618c-.378-.403-.574-1.01-.574-1.819zM11.589.566c2.545-.893 5.442-.845 7.619.987c.405.369.867.833 1.051 1.38c.22.692-.77-.073-.906-.167c-.71-.453-1.418-.833-2.212-1.094C12.86.387 8.812 2.709 6.295 6.315c-1.052 1.594-1.737 3.272-2.3 5.117c-.06.202-.109.465-.22.642c-.112.203-.048-.546-.048-.57c.084-.763.244-1.5.441-2.237C5.33 5.337 7.897 2.066 11.59.566zm4.928 7.059a3.02 3.02 0 1 1-6.04 0a3.02 3.02 0 1 1 6.04 0Z"
      ></path>
    </svg>
  );
}

export function Github(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"
      ></path>
    </svg>
  );
}

export function Reddit(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M14.5 15.41c.08.09.08.28 0 .39c-.73.7-2.09.76-2.5.76c-.39 0-1.75-.06-2.46-.76c-.1-.11-.1-.3 0-.39c.11-.1.28-.1.38 0c.46.46 1.41.59 2.08.59c.69 0 1.66-.13 2.1-.59c.11-.1.28-.1.4 0m-3.75-2.37c0-.57-.47-1.04-1.04-1.04c-.57 0-1.04.47-1.04 1.04c0 .57.47 1.05 1.04 1.04c.57 0 1.04-.47 1.04-1.04M14.29 12c-.57 0-1.04.5-1.04 1.05s.47 1.04 1.04 1.04c.57 0 1.04-.48 1.04-1.04c0-.55-.47-1.05-1.04-1.05M22 12c0 5.5-4.5 10-10 10S2 17.5 2 12S6.5 2 12 2s10 4.5 10 10m-3.33 0c0-.81-.67-1.46-1.45-1.46c-.4 0-.76.16-1.02.41c-1-.72-2.37-1.18-3.9-1.24l.67-3.13l2.17.47c.02.55.48.99 1.04.99c.57 0 1.04-.47 1.04-1.04c0-.57-.47-1.04-1.04-1.04c-.41 0-.77.24-.93.59l-2.43-.52c-.07-.03-.14 0-.19.04c-.06.04-.09.1-.1.17l-.74 3.48c-1.55.05-2.95.51-3.97 1.24c-.26-.25-.62-.4-1.01-.4c-.81 0-1.46.65-1.46 1.44c0 .61.36 1.11.86 1.34c-.02.16-.03.28-.03.44c0 2.22 2.61 4.07 5.82 4.07c3.23 0 5.85-1.82 5.85-4.07c0-.14-.01-.28-.04-.44c.5-.23.86-.74.86-1.34Z"
      ></path>
    </svg>
  );
}

export function Stackoverflow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 512 512" {...props}>
      <path fill="currentColor" d="M392 440V320h40v160H64V320h40v120Z"></path>
      <path
        fill="currentColor"
        d="m149.1 308.77l198.57 40.87l8.4-39.32l-198.57-40.87Zm26.27-93.12L359.22 300L376 263.76l-183.82-84.84Zm50.95-89l156 127.78l25.74-30.52l-156-127.78ZM328 32l-33.39 23.8l120.82 160.37L448 192ZM144 400h204v-40H144Z"
      ></path>
    </svg>
  );
}

export function FramePerson(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M18 19H6q-.425 0-.713-.288T5 18v-2.35q0-.5.213-.925t.612-.7q1.275-.95 2.938-1.488T12 12q1.575 0 3.238.537t2.937 1.488q.4.275.613.7t.212.925V18q0 .425-.288.713T18 19Zm-6-8q-1.65 0-2.825-1.175T8 7q0-1.65 1.175-2.825T12 3q1.65 0 2.825 1.175T16 7q0 1.65-1.175 2.825T12 11ZM5 3H3v2q0 .425-.288.713T2 6q-.425 0-.713-.288T1 5V3q0-.825.588-1.413T3 1h2q.425 0 .713.288T6 2q0 .425-.288.713T5 3ZM3 23q-.825 0-1.413-.588T1 21v-2q0-.425.288-.713T2 18q.425 0 .713.288T3 19v2h2q.425 0 .713.288T6 22q0 .425-.288.713T5 23H3Zm18 0h-2q-.425 0-.713-.288T18 22q0-.425.288-.713T19 21h2v-2q0-.425.288-.713T22 18q.425 0 .713.288T23 19v2q0 .825-.588 1.413T21 23ZM19 3q-.425 0-.713-.288T18 2q0-.425.288-.713T19 1h2q.825 0 1.413.588T23 3v2q0 .425-.288.713T22 6q-.425 0-.713-.288T21 5V3h-2Z"
      ></path>
    </svg>
  );
}

export function AboutAdmin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="m448 362.7l-117.3-21.3C320 320 320 310.7 320 298.7c10.7-10.7 32-21.3 32-32c10.7-32 10.7-53.3 10.7-53.3c5.5-8 21.3-21.3 21.3-42.7s-21.3-42.7-21.3-53.3C362.7 32 319.2 0 256 0c-60.5 0-106.7 32-106.7 117.3c0 10.7-21.3 32-21.3 53.3s15.2 35.4 21.3 42.7c0 0 0 21.3 10.7 53.3c0 10.7 21.3 21.3 32 32c0 10.7 0 21.3-10.7 42.7L64 362.7C21.3 373.3 0 448 0 512h512c0-64-21.3-138.7-64-149.3z"
      ></path>
    </svg>
  );
}
