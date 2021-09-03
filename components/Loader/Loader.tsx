import style from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={style.wrapper}>
      <p className={style.text}>Loading...</p>
      <div className={style.loader}></div>
    </div>
  );
};

export default Loader;
