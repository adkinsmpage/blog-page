import style from "./PostList.module.css";
interface IPostList {
  children: React.ReactNode;
}

export default function PostList({ children }: IPostList) {
  return <div className={style.wrapper}>{children}</div>;
}
