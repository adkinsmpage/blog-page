import style from "../../styles/ProfilePage.module.css";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/client";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/user";
import { UserState } from "../../store/slices/userInfoSlice";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from "../../utils/consts";

interface IProfileScreen {
  session: any;
  userInfo: UserState;
}

type Inputs = {
  email: string;
  name: string;
  password: string;
};

export default function ProfileScreen({ session, userInfo }: IProfileScreen) {
  const [isEdit, setIsEdit] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className={style.wrapper}>
      <h1 className={style.header}>Profile page</h1>
      {!isEdit && (
        <>
          <p>
            <span>email:</span> {userInfo.email}
          </p>
          <p>
            <span>name:</span> {userInfo.name}
          </p>
          <p>
            <span>password:</span>*****
          </p>
        </>
      )}
      {isEdit && (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              defaultValue={userInfo.email}
              {...register("email", { pattern: EMAIL_VALIDATION })}
            />
            <input
              defaultValue={userInfo.name}
              {...register("name", { minLength: 3 })}
            />
            <input
              placeholder="new password"
              type="password"
              {...register("password", { pattern: PASSWORD_VALIDATION })}
            />
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
