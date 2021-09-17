import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useSWRConfig } from "swr";

import { useCreateStatus } from "../../lib/createStatus";

import { ICommentData } from "../../pages/posts/[id]";

import style from "./Comments.module.css";
import { useSession } from "next-auth/client";

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
    reset,
    formState: { errors },
  } = useForm<CommentInput>();
  const [session, loading] = useSession();
  const { mutate } = useSWRConfig();
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
        mutate(`/api/comments/${postId}`);
        reset();
      } catch (error) {
        createStatus("Error", "something went wrong", "error");
      }
    }
  };

  return (
    <div className={style.wrapper}>
      <p className={style.header}>Comments</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {session ? (
          <>
            <textarea
              {...register("content", { required: true, minLength: 5 })}
            ></textarea>

            {errors.content && <p>field is required, min. Length: 5</p>}
            <button>add comment</button>
          </>
        ) : (
          <p className={style.loginInfo}>Login to add comment</p>
        )}
      </form>
      <div className={style.list}>{children}</div>
    </div>
  );
};

export default Comments;
