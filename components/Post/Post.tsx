import { IPostElement } from "../../pages";
import style from "./Post.module.css";

interface IPost {
  data: IPostElement;
}

export default function Post({ data }: IPost) {
  const cutText = (length: number, text: string) => {
    if (text.length <= length) return text;
    return `${text.substr(0, length)}...`;
  };

  return (
    <div className={style.wrapper}>
      <h2>{cutText(40, data.title)}</h2>
      <div className={style.postInformation}>
        <p>{data.author}</p>
        <p>{data.date}</p>
      </div>
      <p className={style.content}>{cutText(170, data.content)}</p>
    </div>
  );
}
