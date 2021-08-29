import { IPostElement } from "../../index";
import { useForm, SubmitHandler } from "react-hook-form";

// import style from "../../styles/PostScreen.module.css";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import PostModel from "../../../models/post";
import dbConnect from "../../../lib/dbConnect";

export const getStaticPaths: GetStaticPaths = async () => {
  console.log("elooooooooooooooooooooooooooooooooooooooooooo");

  await dbConnect();
  const postArr = await PostModel.find({}, { _id: 1 });
  console.log(postArr);

  const paths = postArr.map((element: IPostElement) => ({
    params: { id: element._id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await PostModel.findById(params?.id);

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
  if (!postInfo) return <h1>Loading...</h1>;
  const post = JSON.parse(postInfo);
  console.log("hello");

  const { title, author, createdAt, content } = post || {};

  return (
    <div>
      <form action="">
        <input type="text" />
        <textarea></textarea>
        <button>Update Post</button>
        <button>Cancel</button>
      </form>
    </div>
  );
}
