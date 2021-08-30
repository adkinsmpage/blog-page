import style from "./Modal.module.css";

interface IModal {
  text: string;
  confirmCallback(): void;
  cancelCallback(): void;
}

export default function Modal({
  text,
  confirmCallback,
  cancelCallback,
}: IModal) {
  return (
    <div className={style.background}>
      <div className={style.wrapper}>
        <p className={style.header}>{text}</p>
        <div className={style.buttonsWrapper}>
          <button onClick={confirmCallback}>yes</button>
          <button onClick={cancelCallback}>no</button>
        </div>
      </div>
    </div>
  );
}
