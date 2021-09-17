import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/client";
import useSWR from "swr";

import UserElement, { IUser } from "../../components/userElement/UserElement";

import style from "../../styles/UsersList.module.css";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Users() {
  const [usersElements, setUsersElements] = useState<React.ReactNode[]>([]);
  const [session, loading] = useSession();

  const { data: users, error } = useSWR(`/api/user`, fetcher);

  useEffect(() => {
    const usersArr = users?.map((elem: IUser) => {
      if (elem._id !== session?.user.id)
        return <UserElement key={elem._id} user={elem} />;
    });
    setUsersElements(usersArr);
  }, [users, session]);

  return (
    <div className={style.wrapper}>
      {loading ? "Loading..." : usersElements}
    </div>
  );
}
