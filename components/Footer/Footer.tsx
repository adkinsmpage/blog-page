import style from "./Footer.module.css";
import { useForm } from "react-hook-form";

const EMAIL_VALIDATION = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Footer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <div className={style.wrapper}>
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
