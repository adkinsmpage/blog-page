import { useContext, useRef } from "react";
import NotificationContext from "../store/notificationContext";

export const useCreateStatus = () => {
  const notificationCtx = useContext(NotificationContext);

  const createStatus = (title: string, message: string, status: string) => {
    notificationCtx.showNotification({ title, message, status });
  };

  const createStatusRef = useRef(createStatus);

  return { createStatus: createStatusRef.current };
};
