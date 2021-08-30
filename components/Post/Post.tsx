import { IPostElement } from "../../pages";
import style from "./Post.module.css";
import { useRouter } from "next/router";
import moment from "moment";
import { DATA_FORMAT } from "../../utils/consts";
import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";
import axios from "axios";

interface IPost {
  data: IPostElement;
}

export default function Post({ data }: IPost) {
  const [session, setSession] = useState<any>();

  const handleGetSession = async () => {
    const session = await getSession();
    setSession(session);
  };

  useEffect(() => {
    handleGetSession();
  }, []);

  const router = useRouter();
  const cutText = (length: number, text: string) => {
    if (text.length <= length) return text;
    return `${text.substr(0, length)}...`;
  };
  const removePost = async () => {
    const { data: response } = await axios.delete(`/api/post/${data._id}`);
  };

  return (
    <div className={style.wrapper}>
      <h2 onClick={() => router.push(`/posts/${data._id}`)}>
        {cutText(40, data.title)}
      </h2>
      <div className={style.postInformation}>
        <p>{data.author}</p>
        <p>{moment(data.createdAt).format(DATA_FORMAT)}</p>
      </div>
      <p className={style.content}>{cutText(170, data.content)}</p>
      {session?.user?.isAdmin && (
        <>
          <p
            className={style.edit}
            onClick={() => router.push(`/posts/editPost/${data._id}`)}
          >
            edit
          </p>
          <p className={style.remove} onClick={removePost}>
            remove
          </p>
        </>
      )}
    </div>
  );
}
