import React from "react";
import { Warning } from "../icons/icons";

export default function ErrorFallback(props: { error: string }) {
  return (
    <div role="alert">
      <p>Oops..! Something went wrong:</p>
      <pre>{props.error}</pre>
      <button>
        <Warning />
        Try Again
      </button>
    </div>
  );
}
