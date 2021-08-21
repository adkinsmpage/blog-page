import { useForm } from "react-hook-form";
import style from "./UserForm.module.css";

interface IUserForm {
  callback(formData: IUserFormData): void;
  isRegister?: boolean;
}

export interface IUserFormData {
  email: string;
  password: string;
  name?: string;
}

const UserForm = ({ isRegister, callback }: IUserForm) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: IUserFormData) => {
    callback(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.wrapper}>
      <input
        type="text"
        placeholder="email"
        {...register("email", { required: true })}
      />
      <input
        type="password"
        placeholder="password"
        {...register("password", { required: true })}
      />
      {isRegister && (
        <input
          type="text"
          placeholder="name"
          {...register("name", { required: true })}
        />
      )}
      <button>{isRegister ? "Signup" : "Login"}</button>
    </form>
  );
};

export default UserForm;
