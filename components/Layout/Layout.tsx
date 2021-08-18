import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import style from "./Layout.module.css";

interface ILayout {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayout) {
  return (
    <div className={style.wrapper}>
      <NavBar />
      <div className={style.content}>{children}</div>

      <Footer />
    </div>
  );
}
