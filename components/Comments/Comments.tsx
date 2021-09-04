import style from "./Comments.module.css";

interface IComments {
  children: React.ReactNode;
}

const Comments = ({ children }: IComments) => {
  return (
    <div className={style.wrapper}>
      <p className={style.header}>Comments</p>
      <textarea></textarea>
      <button>add comment</button>
      <div className={style.list}>{children}</div>
    </div>
  );
};

export default Comments;
