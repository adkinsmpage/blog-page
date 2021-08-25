import UserForm, { IUserFormData } from "../../components/UserForm/UserForm";
import style from "../../styles/Form.module.css";
import axios from "axios";
import { useContext } from "react";
import NotificationContext from "../../store/notificationContext";
import { getSession, signIn } from "next-auth/client";
import router from "next/router";
import { GetServerSideProps } from "next";

function Signup() {
  const notificationCtx = useContext(NotificationContext);
  const userSignup = async (formData: IUserFormData) => {
    notificationCtx.showNotification({
      title: "Registering...",
      message: "Creating your account",
      status: "pending",
    });
    try {
      const data = await axios.post("/api/auth/signup", formData);
      if (data) {
        notificationCtx.showNotification({
          title: "Success",
          message: "Login now to your account",
          status: "success",
        });
        const result = await signIn("credentials", {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });
        if (!result?.error) router.push("/user/profile");
      }
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (session) {
    return {
      redirect: {
        destination: "/user/profile",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};

export default Signup;
