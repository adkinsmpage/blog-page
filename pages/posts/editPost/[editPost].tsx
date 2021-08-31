import { IPostElement } from "../../index";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";

import style from "../../../styles/EditPost.module.css";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import PostModel from "../../../models/post";
import dbConnect from "../../../lib/dbConnect";

type EditInputs = {
  title: string;
  content: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  await dbConnect();
  const postArr = await PostModel.find({}, { _id: 1 });

  const paths = postArr.map((element: IPostElement) => ({
    params: { editPost: element._id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await PostModel.findById(params?.editPost);

  if (!postData) return { notFound: true };

  return {
    props: {
      postInfo: JSON.stringify(postData),
    },
  };
};

export default function EditPost({
  postInfo,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditInputs>();

  const onSubmit: SubmitHandler<EditInputs> = async (data) => {};

  if (!postInfo) return <h1>Loading...</h1>;
  const post = JSON.parse(postInfo);

  const { title, content } = post || {};

  return (
    <div className={style.wrapper}>
      <p className={style.header}>Edit post</p>
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
