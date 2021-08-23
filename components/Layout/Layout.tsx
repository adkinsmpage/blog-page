import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import style from "./Layout.module.css";
import Notification from "../../components/Notification/Notification";
import { useContext } from "react";
import NotificationContext from "../../store/notificationContext";

interface ILayout {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayout) {
  const notifictationCtx = useContext(NotificationContext);

  const activeNotifiaction = notifictationCtx.notificationObj;

  return (
    <div className={style.wrapper}>
      {activeNotifiaction.status && (
        <Notification notificationObj={activeNotifiaction} />
      )}

      <NavBar />
      <div className={style.content}>{children}</div>

      <Footer />
    </div>
  );
}
