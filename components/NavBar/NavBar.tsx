import style from "./NavBar.module.css";
import Image from "next/dist/client/image";
import { useState } from "react";
import { useRouter } from "next/router";

export default function NavBar() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  return (
    <div className={style.wrapper}>
      <p className={style.logo} onClick={() => router.push("/")}>
        1MinDev
      </p>
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
          <li onClick={() => router.push("posts/newPost")}>Github</li>
        </ul>
      </nav>
    </div>
  );
}
