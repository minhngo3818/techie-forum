import { ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function toastResponse(type: string, message: string) {
  let defaultConfigs = {
    position: "top-center",
    hideProgressBar: true,
  } as ToastOptions;

  switch (type) {
    case "info":
      toast.info(message, defaultConfigs);
      break;
    case "success":
      toast.success(message, defaultConfigs);
      break;
    case "error":
      toast.success(message, defaultConfigs);
      break;
    case "warning":
      toast.warning(message, defaultConfigs);
      break;
    default:
      toast(message, defaultConfigs);
      break;
  }
}
