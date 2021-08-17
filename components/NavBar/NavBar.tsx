import style from "./NavBar.module.css";
import Image from "next/dist/client/image";
import { useState } from "react";

export default function NavBar() {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className={style.wrapper}>
      <p className={style.logo}>1MinDev</p>
      <Image
        src="/menu.svg"
        alt="menu icon"
        width={40}
        height={40}
        className={style.menuIcon}
        onClick={() => setIsVisible((prevValue) => !prevValue)}
      />
      <nav className={isVisible ? style.navVisible : style.nav}>
        <ul className={style.list}>
          <li>Blog</li>
          <li>Login</li>
          <li>Github</li>
        </ul>
      </nav>
    </div>
  );
}
