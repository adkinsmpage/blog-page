import style from "./NavBar.module.css";
import Image from "next/dist/client/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/client";

export default function NavBar() {
  const [isVisible, setIsVisible] = useState(false);

  const [session, loading] = useSession();

  const router = useRouter();

  const goTo = (path: string) => {
    setIsVisible(false);
    router.push(path);
  };

  const logoutHandler = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    router.push(data.url);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.navWrapper}>
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
            <li onClick={() => goTo("/")}>Blog</li>

            {session && session.user.isAdmin && (
              <>
                <li onClick={() => goTo("/posts/newPost")}>New Post</li>
                <li onClick={() => goTo("/users")}>All users</li>
              </>
            )}
            <li
              onClick={() =>
                goTo(`${session ? "/user/profile" : "/user/login"}`)
              }
            >
              {session ? "Profile" : "Login"}
            </li>
            {session && <li onClick={logoutHandler}>Logout</li>}
            <li
              className={style.github}
              onClick={() => goTo("https://github.com/atrykp")}
            >
              Github
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
