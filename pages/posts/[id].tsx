import { IPostElement, postsList } from "../../pages/index";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import style from "../../styles/PostScreen.module.css";

export default function PostScreen() {
  const [currentPost, setCurrentPost] = useState<IPostElement>();
  const router = useRouter();
  const postInfo = router.query;

  useEffect(() => {
    if (postInfo?.id) {
      const [post] = postsList.filter(
        (element: IPostElement) => element._id.toString() === postInfo.id
      );
      setCurrentPost(post);
    }
  }, [postInfo]);

  const { title, author, createdAt, content } = currentPost || {};

  return (
    <div className={style.wrapper}>
      <h1 className={style.header}>{title}</h1>
      <div className={style.postInfo}>
        <p>{author}</p>
        <p>{createdAt}</p>
      </div>
      <p className={style.text}>{content}</p>
    </div>
  );
}
