import style from "./Layout.module.css";

interface ILayout {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayout) {
  return <div className={style.wrapper}></div>;
}
