import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateStatus } from "../../lib/createStatus";
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
  const { createStatus } = useCreateStatus();
  const onSubmit: SubmitHandler<CommentInput> = async (content) => {
    createStatus("Waiting...", "waiting for server", "pending");
    if (data) {
      const { author, authorId, postId } = data;
      const comment = {
        author,
        authorId,
        postId,
        content: content.content,
      };
      try {
        const response = await axios.post("/api/comments", comment);
        if (!response) throw new Error("something went wrong");
        createStatus("Success", "comment added", "success");
      } catch (error) {
        createStatus("Error", "something went wrong", "error");
      }
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
