import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import style from "./Layout.module.css";
import Notification from "../../components/Notification/Notification";

interface ILayout {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayout) {
  return (
    <div className={style.wrapper}>
      <Notification
        notificationData={{
          title: "",
          message: "",
          status: "",
        }}
      />
      <NavBar />
      <div className={style.content}>{children}</div>

      <Footer />
    </div>
  );
}
