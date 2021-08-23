import { useContext } from "react";
import NotificationContext, {
  INotificationObj,
} from "../../store/notificationContext";
import style from "./Notification.module.css";

interface INotificationProps {
  notificationObj: INotificationObj;
}

export default function Notification({ notificationObj }: INotificationProps) {
  const { title, message, status } = notificationObj;
  const notificationCtx = useContext(NotificationContext);
  return (
    <div
      className={style.wrapper}
      style={{
        backgroundColor: `${
          status === "error"
            ? "darkred"
            : status === "success"
            ? "darkgreen"
            : "darkblue"
        }`,
      }}
      onClick={notificationCtx.hideNotification}
    >
      <p className={style.title}>{title}</p>
      <p className={style.message}>{message}</p>
    </div>
  );
}
