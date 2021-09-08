import { useState } from "react";
import { useSession } from "next-auth/client";
import axios from "axios";

import { useCreateStatus } from "../../lib/createStatus";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";

import style from "./Comment.module.css";

interface CommentData {
  author: string;
  content: string;
  date: string;
  commentId: string;
}

const CommentElement = ({ author, content, date, commentId }: CommentData) => {
  const [isModal, setIsModal] = useState(false);
  const [session, loading] = useSession();
  const { createStatus } = useCreateStatus();

  const removeComment = async () => {
    try {
      createStatus("Waiting...", "waiting for server", "pending");
      const response = await axios.delete(`/api/comments/${commentId}`);
      if (!response) throw new Error("Can't remove comment");
      createStatus("Success", "comment removed", "success");
      closeModal();
    } catch (error: any) {
      createStatus("Error", error.message, "error");
    }
  };
  const closeModal = () => setIsModal(false);
  return (
    <div className={style.wrapper}>
      <div className={style.info}>
        <p>{author}</p>
        <p>{date}</p>
      </div>
      <p className={style.content}>{content}</p>
      {session?.user.isAdmin && (
        <button
          className={`${style.removeBtn} secondary-btn`}
          onClick={() => setIsModal(true)}
        >
          remove
        </button>
      )}
      {isModal && (
        <Modal
          text="Are you sure?"
          confirmCallback={removeComment}
          cancelCallback={closeModal}
        />
      )}
    </div>
  );
};
export default CommentElement;
