import style from "./Comment.module.css";

interface CommentData {
  author: string;
  content: string;
  date: string;
}

const CommentElement = ({ author, content, date }: CommentData) => {
  return (
    <div className={style.wrapper}>
      <div className={style.info}>
        <p>{author}</p>
        <p>{date}</p>
      </div>
      <p className={style.content}>{content}</p>
    </div>
  );
};
export default CommentElement;
