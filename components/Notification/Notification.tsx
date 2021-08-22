import style from "./Notification.module.css";

interface INotification {
  notificationData: {
    title: string;
    message: string;
    status: string;
  };
}

export default function Notification({ notificationData }: INotification) {
  const { title, message, status } = notificationData;
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
    >
      <p className={style.title}>{title}</p>
      <p className={style.message}>{message}</p>
    </div>
  );
}
