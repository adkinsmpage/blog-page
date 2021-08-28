import style from "../../styles/ProfilePage.module.css";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/user";
import { UserState } from "../../store/slices/userInfoSlice";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from "../../utils/consts";
import axios from "axios";
import { useCreateStatus } from "../../lib/createStatus";

interface IProfileScreen {
  session: any;
  userInfo: UserState;
}

type Inputs = {
  email: string;
  name: string;
  password?: string;
};

export default function ProfileScreen({ session, userInfo }: IProfileScreen) {
  const [isEdit, setIsEdit] = useState(false);
  const { createStatus } = useCreateStatus();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    createStatus("Waiting...", "waiting for server", "pending");
    if (!data.password) {
      delete data.password;
    }

    try {
      const { data: updatedData } = await axios.post("/api/user", {
        data,
        id: session.user.id,
      });
      if (updatedData.status === 404 || !updatedData) {
        createStatus("Error", "something went wrong", "error");
      }

      createStatus("Success", "your data was updated", "success");
    } catch (error) {
      createStatus("Error", `${error.message}`, "error");
    }
  };

  return (
    <div className={style.wrapper}>
      <h1 className={style.header}>Profile page</h1>
      {!isEdit && (
        <div className={style.userData}>
          <p>
            <span>email:</span> {userInfo.email}
          </p>
          <p>
            <span>name:</span> {userInfo.name}
          </p>
          <p>
            <span>password:</span>*****
          </p>
        </div>
      )}
      {isEdit && (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              defaultValue={userInfo.email}
              placeholder="new email"
              {...register("email", { pattern: EMAIL_VALIDATION })}
            />
            {errors.email && (
              <p className={style.errorMessage}>invalid email</p>
            )}
            <input
              placeholder="new name"
              defaultValue={userInfo.name}
              {...register("name", { minLength: 3 })}
            />
            {errors.name && <p className={style.errorMessage}>invalid name</p>}
            <input
              placeholder="new password"
              type="password"
              {...register("password", { pattern: PASSWORD_VALIDATION })}
            />
            {errors.password && (
              <p className={style.errorMessage}>invalid password</p>
            )}
            <input type="submit" value="UPDATE" className={style.updateBtn} />
          </form>
        </>
      )}
      <button onClick={() => setIsEdit((prevVal) => !prevVal)}>
        {isEdit ? "Cancel" : "Edit data"}
      </button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/user/login",
        permanent: false,
      },
    };
  }

  await dbConnect();
  const userInfo = await User.findOne({ email: session?.user?.email });

  return {
    props: {
      session,
      userInfo: {
        name: userInfo.name,
        email: userInfo.email,
      },
    },
  };
};
