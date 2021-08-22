import UserForm, { IUserFormData } from "../../components/UserForm/UserForm";
import style from "../../styles/Form.module.css";
import axios from "axios";

function Signup() {
  const userSignup = async (formData: IUserFormData) => {
    const data = await axios.post("/api/user/signup", formData);
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
