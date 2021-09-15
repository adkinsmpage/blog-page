import style from "./Footer.module.css";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/client";
import axios from "axios";
import { useCreateStatus } from "../../lib/createStatus";

interface IEmailMessage {
  name: string;
  email: string;
  content: string;
}

const EMAIL_VALIDATION = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Footer() {
  const router = useRouter();
  const [session, loading] = useSession();
  const { createStatus } = useCreateStatus();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: IEmailMessage) => {
    try {
      createStatus("Waiting...", "sending message...", "pending");
      const response = await axios.post("api/contact", data);
      if (!response) throw new Error("something went wrong");
      createStatus("Thank you!", "Message sent", "success");
      router.reload();
    } catch (error: any) {
      createStatus("Error", error.message, "error");
    }
  };
  const logoutHandler = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    router.push(data.url);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
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
            {errors.name && (
              <p className={style.errorMessage}>Name is required</p>
            )}
            <input
              type="email"
              placeholder="email"
              {...register("email", {
                required: true,
                pattern: EMAIL_VALIDATION,
              })}
            />
            {errors.email && (
              <p className={style.errorMessage}>Invalid email</p>
            )}
            <textarea
              placeholder="your message"
              {...register("content", { required: true, minLength: 2 })}
            />
            {errors.content && (
              <p className={style.errorMessage}>Required (min. length 2)</p>
            )}
            <button className={style.formSubmitBtn}>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}
