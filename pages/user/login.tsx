import UserForm, { IUserFormData } from "../../components/UserForm/UserForm";
import style from "../../styles/Form.module.css";
import { signIn } from "next-auth/client";

function Login() {
  const userLogin = async (formData: IUserFormData) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });
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
