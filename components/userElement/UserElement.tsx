import { useState } from "react";
import EditUser from "../EditUser/EditUser";
import style from "./UserElement.module.css";

export interface IUser {
  isAdmin: boolean;
  _id: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}
interface IUserElement {
  user: IUser;
}

const UserElement = ({ user }: IUserElement) => {
  const [isEditActive, setIsEditActive] = useState(false);
  const { name, email, isAdmin } = user || {};
  return (
    <div className={style.wrapper}>
      <div className={style.infoWrapper}>
        <p>name: {name}</p>
        <p>email: {email}</p>
        <p>isAdmin: {`${isAdmin}`}</p>
      </div>
      <div className={style.buttonsWrapper}>
        <button onClick={() => setIsEditActive(true)}>edit</button>
        <button>remove</button>
      </div>
      {isEditActive && <EditUser />}
    </div>
  );
};

export default UserElement;
