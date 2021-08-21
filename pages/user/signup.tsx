import UserForm, { IUserFormData } from "../../components/UserForm/UserForm";
import style from "../../styles/Form.module.css";

function Signup() {
  const userSignup = (formData: IUserFormData) => {
    console.log(formData);
  };
  return (
    <div className={style.wrapper}>
      <h1>SignUp</h1>
      <div className={style.form}>
        <UserForm isRegister callback={userSignup} />
      </div>
    </div>
  );
}

export default Signup;
