import axios from "axios";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/client";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/user";
import { useAppDispatch } from "../../store/hooks";
import { updateUserInfo, UserState } from "../../store/slices/userInfoSlice";

interface IProfileScreen {
  session: any;
  userInfo: UserState;
}

export default function ProfileScreen({ session, userInfo }: IProfileScreen) {
  const dispatch = useAppDispatch();
  dispatch(updateUserInfo(userInfo));

  return (
    <div>
      <h1>Profile page</h1>
      <h2>{userInfo.email}</h2>
      <h2>{userInfo.name}</h2>
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
