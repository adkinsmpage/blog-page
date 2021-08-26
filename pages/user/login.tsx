import { useCallback, useEffect, useState } from "react";
import { getSession, signIn } from "next-auth/client";
import { useRouter } from "next/router";

import { useCreateStatus } from "../../lib/createStatus";

import UserForm, { IUserFormData } from "../../components/UserForm/UserForm";

import style from "../../styles/Form.module.css";

function Login() {
  const [isLoading, setIsLoading] = useState(true);

  const { createStatus } = useCreateStatus();
  const router = useRouter();

  const userLogin = async (formData: IUserFormData) => {
    createStatus("Loading", "Waiting for server", "pending");
    const result = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (!result?.error) {
      createStatus("Success", "Welcome", "success");
      router.push("/user/profile");
    } else {
      createStatus("Error", `${result?.error}`, "error");
    }
  };

  const checkSession = useCallback(async () => {
    const session = await getSession();

    if (session) {
      router.push("/user/profile");
    }
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
