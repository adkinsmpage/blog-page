import style from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={style.wrapper}>
      <div className={style.formWrapper}>
        <p>Write something</p>
        <form action="">
          <input type="text" placeholder="name" />
          <input type="email" placeholder="email" />
          <textarea placeholder="your message" />
        </form>
      </div>
    </div>
  );
}
