import style from "./Footer.module.css";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/client";

interface IEmailMessage {
  name: string;
  email: string;
  content: string;
}

const EMAIL_VALIDATION = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Footer() {
  const router = useRouter();
  const [session, loading] = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: IEmailMessage) => console.log(data);
  const logoutHandler = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    router.push(data.url);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.menu}>
        <ul className={style.list}>
          <li onClick={() => router.push("/")}>Blog</li>
          <li
            onClick={() =>
              router.push(`${session ? "/user/profile" : "/user/login"}`)
            }
          >
            {session ? "Profile" : "Login"}
          </li>
          <li onClick={() => router.push("https://github.com/atrykp")}>
            Github
          </li>
          {session && <li onClick={logoutHandler}>Logout</li>}
          {session && session.user.isAdmin && (
            <>
              <li onClick={() => router.push("/posts/newPost")}>New Post</li>
              <li onClick={() => router.push("/users")}>All users</li>
            </>
          )}
        </ul>
      </div>
      <div className={style.formWrapper}>
        <p>Write something</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="name"
            {...register("name", { required: true })}
          />
          <input
            type="email"
            placeholder="email"
            {...register("email", {
              required: true,
              pattern: EMAIL_VALIDATION,
            })}
          />
          <textarea
            placeholder="your message"
            {...register("content", { required: true, minLength: 2 })}
          />
          <button className={style.formSubmitBtn}>Send</button>
        </form>
      </div>
    </div>
  );
}
