import UserForm, { IUserFormData } from "../../components/UserForm/UserForm";
import style from "../../styles/Form.module.css";
import { getSession, signIn } from "next-auth/client";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";
import NotificationContext from "../../store/notificationContext";

function Login() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const notificationCtx = useContext(NotificationContext);
  const userLogin = async (formData: IUserFormData) => {
    notificationCtx.showNotification({
      title: "Loading",
      message: "Waiting for server",
      status: "pending",
    });
    const result = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (!result?.error) {
      notificationCtx.showNotification({
        title: "Success",
        message: "Welcome",
        status: "success",
      });
      router.push("/user/profile");
    } else {
      notificationCtx.showNotification({
        title: "Error",
        message: `${result?.error}`,
        status: "error",
      });
    }
  };

  const checkSession = useCallback(async () => {
    const session = await getSession();
    if (session) return router.push("/user/profile");
    setIsLoading(false);
  }, [router]);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return (
    <div className={style.wrapper}>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1>Login</h1>
          <div className={style.form}>
            <UserForm callback={userLogin} />
          </div>
        </>
      )}
    </div>
  );
}

export default Login;
