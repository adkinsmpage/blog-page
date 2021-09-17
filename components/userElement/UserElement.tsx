import axios from "axios";
import { useSWRConfig } from "swr";
import { getSession } from "next-auth/client";
import router from "next/router";
import { useState } from "react";
import { useCreateStatus } from "../../lib/createStatus";
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

  const { mutate } = useSWRConfig();

  const { name, email, isAdmin, _id } = user || {};

  const { createStatus } = useCreateStatus();

  const closeEdit = () => {
    setIsEditActive(false);
  };
  const removeUser = async () => {
    createStatus("Waiting...", "user deleting", "pending");
    try {
      const session = await getSession();
      const { data } = await axios.delete(
        `/api/user/${session?.user.id}/${_id}`
      );
      if (!data) throw new Error("something went wrong");
      setRemoveModal(false);
      createStatus("Success", "user deleted", "success");
      mutate(`/api/user`);
    } catch (error: any) {
      createStatus("Error", error?.message, "error");
    }
  };

  const closeRemoveModal = () => {
    setRemoveModal(false);
  };

  const updateUser = async (data: any) => {
    createStatus("Waiting...", "user is updating", "pending");
    const updateUserObj = {
      id: _id,
      ...data,
    };
    try {
      const response = await axios.patch("/api/user", updateUserObj);
      if (!response) throw new Error("something went wrong");
      setIsEditActive(false);
      mutate(`/api/user`);
      createStatus("Success", "user updated", "success");
    } catch (error: any) {
      createStatus("Error", error?.message, "error");
    }
  };
  return (
    <div className={style.wrapper}>
      <div className={style.infoWrapper}>
        <p>
          name: <span>{name}</span>{" "}
        </p>
        <p>
          email: <span>{email}</span>{" "}
        </p>
        <p>
          isAdmin: <span>{`${isAdmin}`}</span>{" "}
        </p>
      </div>
      <div className={style.buttonsWrapper}>
        <button
          className={"secondary-btn"}
          onClick={() => setIsEditActive(true)}
        >
          edit
        </button>
        <button className="secondary-btn" onClick={() => setRemoveModal(true)}>
          remove
        </button>
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
