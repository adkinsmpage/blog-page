import style from "../../styles/NewPost.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { getSession } from "next-auth/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

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
  const onSubmit = async (data: INewPost) => {
    const post = { ...data, author: session.user.email };

    const { data: response } = await axios.post("/api/newPost", post);
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
