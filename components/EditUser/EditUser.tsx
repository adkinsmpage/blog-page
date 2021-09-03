import { getSession } from "next-auth/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { EMAIL_VALIDATION } from "../../utils/consts";
import { IUser } from "../userElement/UserElement";
import style from "./EditUser.module.css";

interface EditUserInputs {
  name: string;
  email: string;
  isAdmin: boolean;
}

interface IEditUser {
  user: IUser;
  confirmCallback(data: any): void;
  closeCallback(): void;
}

export default function EditUser({
  closeCallback,
  confirmCallback,
  user,
}: IEditUser) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditUserInputs>();

  const onSubmit: SubmitHandler<EditUserInputs> = async (data) => {
    const session = await getSession();
    confirmCallback({ editorId: session?.user?.id, ...data });
  };
  return (
    <div className={style.background}>
      <div className={style.wrapper}>
        <p className={style.header}>Edit User</p>
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
          <input
            type="text"
            placeholder="name"
            defaultValue={user.name}
            {...register("name", { required: true })}
            className={`${errors.name ? style.error : ""}`}
          />
          {errors.name && (
            <p className={style.errorMessage}>Name is required</p>
          )}

          <input
            type="text"
            placeholder="email"
            defaultValue={user.email}
            {...register("email", {
              required: true,
              pattern: EMAIL_VALIDATION,
            })}
            className={`${errors.email ? style.error : ""}`}
          />
          {errors.email && (
            <p className={style.errorMessage}>Enter valid email address</p>
          )}
          <div className={style.selectWrapper}>
            <label htmlFor="isAdmin">is admin</label>
            <select
              className={style.select}
              id="isAdmin"
              defaultValue={`${user.isAdmin}`}
              {...register("isAdmin")}
            >
              <option value="false">false</option>
              <option value="true">true</option>
            </select>
          </div>

          <div className={style.buttonsWrapper}>
            <button>Update User</button>
            <button
              type="button"
              className="secondary-btn"
              onClick={closeCallback}
            >
              cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
