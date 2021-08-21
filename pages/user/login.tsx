import UserForm, { IUserFormData } from "../../components/UserForm/UserForm";
import style from "../../styles/Form.module.css";

function Login() {
  const userLogin = (formData: IUserFormData) => {
    console.log(formData);
  };
  return (
    <div className={style.wrapper}>
      <h1>Login</h1>
      <div className={style.form}>
        <UserForm callback={userLogin} />
      </div>
    </div>
  );
}

export default Login;
