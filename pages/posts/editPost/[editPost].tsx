import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import axios from "axios";

import { InferGetServerSidePropsType } from "next";

import PostModel from "../../../models/post";
import dbConnect from "../../../lib/dbConnect";
import { useCreateStatus } from "../../../lib/createStatus";

import style from "../../../styles/EditPost.module.css";

type EditInputs = {
  title: string;
  content: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  await dbConnect();

  const postData = await PostModel.findById(context.params?.editPost);

  if (!postData) return { notFound: true };

  return {
    props: {
      postInfo: JSON.stringify(postData),
    },
  };
};

export default function EditPost({
  postInfo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { createStatus } = useCreateStatus();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditInputs>();

  if (!postInfo) return <h1>Loading...</h1>;
  const post = JSON.parse(postInfo);

  const { title, content, _id: id } = post || {};

  const onSubmit: SubmitHandler<EditInputs> = async (data) => {
    try {
      const { data: response } = await axios.patch(`/api/post/${id}`, data);
      if (!response) throw new Error("something went wrong");
      createStatus("Success", response.message, "success");
      router.push("/");
    } catch (error) {
      createStatus("Error", "something went wrong", "error");
    }
  };

  return (
    <div className={style.wrapper}>
      <h1 className={style.header}>Edit post</h1>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="title"
          type="text"
          defaultValue={title}
          {...register("title", { minLength: 3, required: true })}
        />
        {errors.title && (
          <p className={style.errorMessage}>field is required (min 3 length)</p>
        )}
        <textarea
          placeholder="content"
          defaultValue={content}
          {...register("content", { minLength: 3, required: true })}
        ></textarea>
        {errors.content && (
          <p className={style.errorMessage}>field is required (min 3 length)</p>
        )}
        <div className={style.buttonsWrapper}>
          <button type="submit">Update Post</button>
          <button
            className="secondary-btn"
            type="button"
            onClick={() => router.back()}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
