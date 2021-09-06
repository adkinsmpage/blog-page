import style from "../../styles/NewPost.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { getSession } from "next-auth/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useCreateStatus } from "../../lib/createStatus";
import { useRouter } from "next/router";

interface INewPost {
  title: string;
  content: string;
}

export default function NewPost({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createStatus } = useCreateStatus();
  const router = useRouter();
  const onSubmit = async (data: INewPost) => {
    createStatus("Waiting...", "post is adding...", "pending");
    const post = { ...data, author: session.user.name };
    try {
      const { data: response } = await axios.post("/api/newPost", post);
      if (!response) throw new Error("post has not been added");
      createStatus("Success", "post added", "success");
      router.push("/");
    } catch (error) {
      createStatus("Error", "couldnt add your post", "error");
    }
  };

  return (
    <div className={style.wrapper}>
      <h1>add new post</h1>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: true, minLength: 2 })}
        />
        {errors.title && <p>field is required (min. 2 length)</p>}
        <textarea
          placeholder="Post"
          {...register("content", { required: true, minLength: 3 })}
        />
        {errors.content && <p>field is required (min. 3 length)</p>}
        <button>Public</button>
      </form>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/user/login",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};
