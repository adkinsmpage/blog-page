import { useContext } from "react";
import axios from "axios";
import { getSession, signIn } from "next-auth/client";
import router from "next/router";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { useCreateStatus } from "../../lib/createStatus";

import UserForm, { IUserFormData } from "../../components/UserForm/UserForm";

import style from "../../styles/Form.module.css";

function Signup({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { createStatus } = useCreateStatus();

  const userSignup = async (formData: IUserFormData) => {
    createStatus("Registering...", "Creating your account", "pending");

    try {
      const data = await axios.post("/api/auth/signup", formData);
      if (data) {
        createStatus("Success", "Login now to your account", "success");
        const result = await signIn("credentials", {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });
        if (!result?.error) router.push("/user/profile");
      }
    } catch (error) {
      createStatus(
        "Error",
        error.message || "Sorry, something went wrong",
        "error"
      );
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
