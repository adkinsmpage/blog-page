import UserForm, { IUserFormData } from "../../components/UserForm/UserForm";
import style from "../../styles/Form.module.css";
import axios from "axios";
import { useContext } from "react";
import NotificationContext from "../../store/notificationContext";

function Signup() {
  const notificationCtx = useContext(NotificationContext);
  const userSignup = async (formData: IUserFormData) => {
    notificationCtx.showNotification({
      title: "Registering...",
      message: "Creating your account",
      status: "pending",
    });
    try {
      const data = await axios.post("/api/user/signup", formData);
      if (data)
        notificationCtx.showNotification({
          title: "Success",
          message: "Login now to your account",
          status: "success",
        });
    } catch (error) {
      notificationCtx.showNotification({
        title: "Error",
        message: error.message || "Sorry, something went wrong",
        status: "error",
      });
    }
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
