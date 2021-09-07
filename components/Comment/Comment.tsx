import { useSession } from "next-auth/client";
import { useState } from "react";
import Modal from "../Modal/Modal";
import style from "./Comment.module.css";

interface CommentData {
  author: string;
  content: string;
  date: string;
}

const CommentElement = ({ author, content, date }: CommentData) => {
  const [isModal, setIsModal] = useState(false);
  const [session, loading] = useSession();
  const removeComment = () => {};
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
