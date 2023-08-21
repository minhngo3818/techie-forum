import { ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DELAY_INCREMENT = 200;
const AUTO_CLOSE_TIME = 2000;

interface MessageObject {
  [key: string]: string;
}

export function toastResponse(type: string, message: string, delay?: number) {
  let defaultConfigs = {
    position: "top-center",
    hideProgressBar: true,
    delay: delay,
    autoClose: AUTO_CLOSE_TIME,
  } as ToastOptions;

  switch (type) {
    case "info":
      toast.info(message, defaultConfigs);
      break;
    case "success":
      toast.success(message, defaultConfigs);
      break;
    case "error":
      toast.error(message, defaultConfigs);
      break;
    case "warning":
      toast.warning(message, defaultConfigs);
      break;
    default:
      toast(message, defaultConfigs);
      break;
  }
}

export function toastDelayedSeqMessage(type: string, object: MessageObject) {
  let delay = DELAY_INCREMENT;

  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      toastResponse(type, `${object[key]}`, delay);
    }

    delay += DELAY_INCREMENT;
  }
}
