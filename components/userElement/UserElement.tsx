import axios from "axios";
import { getSession } from "next-auth/client";
import { useState } from "react";
import EditUser from "../EditUser/EditUser";
import Modal from "../Modal/Modal";
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
  const [removeModal, setRemoveModal] = useState(false);
  const { name, email, isAdmin, _id } = user || {};

  const closeEdit = () => {
    setIsEditActive(false);
  };
  const removeUser = async () => {
    try {
      const session = await getSession();
      const { data } = await axios.delete(
        `/api/user/${session?.user.id}/${_id}`
      );
      if (!data) throw new Error("something went wrong");
      setRemoveModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const closeRemoveModal = () => {
    setRemoveModal(false);
  };

  const updateUser = async (data: any) => {
    const updateUserObj = {
      id: _id,
      ...data,
    };
    try {
      const response = await axios.patch("/api/user", updateUserObj);
      if (!response) throw new Error("something went wrong");
      setIsEditActive(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className={style.wrapper}>
      <div className={style.infoWrapper}>
        <p>name: {name}</p>
        <p>email: {email}</p>
        <p>isAdmin: {`${isAdmin}`}</p>
      </div>
      <div className={style.buttonsWrapper}>
        <button onClick={() => setIsEditActive(true)}>edit</button>
        <button onClick={() => setRemoveModal(true)}>remove</button>
      </div>
      {isEditActive && (
        <EditUser
          closeCallback={closeEdit}
          confirmCallback={updateUser}
          user={user}
        />
      )}
      {removeModal && (
        <Modal
          text="are you sure?"
          confirmCallback={removeUser}
          cancelCallback={closeRemoveModal}
        />
      )}
    </div>
  );
};

export default UserElement;
