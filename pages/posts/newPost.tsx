import style from "../../styles/NewPost.module.css";
import { useForm } from "react-hook-form";

export default function NewPost() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    const response = await fetch("/api/newPost", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const postData = await response.json();
  };

  return (
    <div className={style.wrapper}>
      <h1>add new post</h1>

      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="title"
          {...register("title", { required: true, minLength: 2 })}
        />
        <textarea
          placeholder="post"
          {...register("content", { required: true, minLength: 3 })}
        />
        <button>Public</button>
      </form>
    </div>
  );
}
