import { IPostElement } from "../../pages/index";
import style from "../../styles/PostScreen.module.css";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import PostModel from "../../models/post";
import Comment from "../../models/comment";
import dbConnect from "../../lib/dbConnect";
import Comments from "../../components/Comments/Comments";
import { useSession } from "next-auth/client";
import React, { useEffect, useState } from "react";
import CommentElement from "../../components/Comment/Comment";

export const getStaticPaths: GetStaticPaths = async () => {
  await dbConnect();
  const postArr = await PostModel.find({}, { _id: 1 });

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
  const comments = await Comment.find({ postId: params?.id });

  if (!postData) return { notFound: true };

  return {
    props: {
      postInfo: JSON.stringify(postData),
      comments: JSON.stringify(comments),
    },
  };
};

export interface ICommentData {
  authorId: string;
  postId: string;
  author: string;
}

export default function PostScreen({
  postInfo,
  comments,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [session, loading] = useSession();
  const [commentData, setCommentData] = useState<ICommentData>();
  const [commentsList, setCommentsList] = useState<React.ReactNode>();
  const post = JSON.parse(postInfo);
  const commentsArr = JSON.parse(comments);

  const { title, author, createdAt, content, _id } = post || {};

  useEffect(() => {
    if (session) {
      const data = {
        authorId: session.user.id!,
        postId: _id,
        author: session.user.name!,
      };
      setCommentData(data);
    }
    const commArr = commentsArr.map((element: any) => {
      return (
        <CommentElement
          key={element._id}
          author={element.author}
          content={element.content}
          date={element.createdAt}
        />
      );
    });
    setCommentsList(commArr);
  }, [_id, session]);
  if (!postInfo) return <h1>Loading...</h1>;

  return (
    <div className={style.wrapper}>
      <h1 className={style.header}>{title}</h1>
      <div className={style.post}>
        <p>{author}</p>
        <p>{createdAt}</p>
      </div>
      <p className={style.text}>{content}</p>
      <Comments data={commentData}>{commentsList}</Comments>
    </div>
  );
}
