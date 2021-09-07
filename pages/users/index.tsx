import React, { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { useSession } from "next-auth/client";

import UserElement, { IUser } from "../../components/userElement/UserElement";
import User from "../../models/user";

import dbConnect from "../../lib/dbConnect";

import style from "../../styles/UsersList.module.css";

export const getStaticProps: GetStaticProps = async () => {
  await dbConnect();

  const usersList = await User.find({}).select("-password");

  if (usersList.length === 0) return { notFound: true };

  return {
    props: { usersList: JSON.stringify(usersList) },
  };
};

export default function Users({ usersList }: any) {
  const [usersElements, setUsersElements] = useState<React.ReactNode>();
  const [session, loading] = useSession();

  useEffect(() => {
    const users = JSON.parse(usersList);

    const usersArr = users.map((elem: IUser) => {
      if (elem._id !== session?.user.id)
        return <UserElement key={elem._id} user={elem} />;
    });
    setUsersElements(usersArr);
  }, [usersList, session]);

  return (
    <div className={style.wrapper}>
      {loading ? "Loading..." : usersElements}
    </div>
  );
}
