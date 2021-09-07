import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import axios from "axios";
import moment from "moment";

import { useCreateStatus } from "../../lib/createStatus";

import { IPostElement } from "../../pages";
import { DATA_FORMAT } from "../../utils/consts";
import Modal from "../Modal/Modal";

import style from "./Post.module.css";

interface IPost {
  data: IPostElement;
}

export default function Post({ data }: IPost) {
  const [session, setSession] = useState<any>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { createStatus } = useCreateStatus();
  const router = useRouter();

  const handleGetSession = async () => {
    const session = await getSession();
    setSession(session);
  };

  const cutText = (length: number, text: string) => {
    if (text.length <= length) return text;
    return `${text.substr(0, length)}...`;
  };

  const removePost = async () => {
    createStatus("Waiting...", "waiting for server", "pending");
    try {
      const { data: response } = await axios.delete(`/api/post/${data._id}`);
      if (response) createStatus("Success", response.message, "success");
      setIsModalVisible(false);
      router.reload();
    } catch (error) {
      createStatus("Error", "something went wrong", "error");
    }
  };

  const closeModal = () => setIsModalVisible(false);

  useEffect(() => {
    handleGetSession();
  }, []);

  return (
    <div className={style.wrapper}>
      <h2
        onClick={() => router.push(`/posts/${data._id}`)}
        className={style.title}
      >
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
          <p className={style.remove} onClick={() => setIsModalVisible(true)}>
            remove
          </p>
        </>
      )}
      {isModalVisible && (
        <Modal
          text="are you sure?"
          cancelCallback={closeModal}
          confirmCallback={removePost}
        />
      )}
    </div>
  );
}
