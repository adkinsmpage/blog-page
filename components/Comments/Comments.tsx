import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { ICommentData } from "../../pages/posts/[id]";
import style from "./Comments.module.css";

interface IComments {
  children: React.ReactNode;
  data?: ICommentData;
}

type CommentInput = {
  content: string;
};

const Comments = ({ children, data }: IComments) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentInput>();
  const onSubmit: SubmitHandler<CommentInput> = async (content) => {
    if (data) {
      const { author, authorId, postId } = data;
      const comment = {
        author,
        authorId,
        postId,
        content: content.content,
      };
      const response = await axios.post("/api/comments", comment);
    }
  };

  return (
    <div className={style.wrapper}>
      <p className={style.header}>Comments</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          {...register("content", { required: true, minLength: 5 })}
        ></textarea>
        {errors.content && <p>field is required, min. Length: 5</p>}
        <button>add comment</button>
      </form>

      <div className={style.list}>{children}</div>
    </div>
  );
};

export default Comments;
