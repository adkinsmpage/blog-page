import { useForm } from "react-hook-form";
import style from "./UserForm.module.css";
import { useRouter } from "next/router";
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from "../../utils/consts";

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
  const router = useRouter();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={style.wrapper}>
        {isRegister && (
          <>
            <input
              type="text"
              placeholder="name"
              {...register("name", { required: true })}
              className={`${errors.name ? style.error : ""}`}
            />
            {errors.name && (
              <p className={style.errorMessage}>Name is required</p>
            )}
          </>
        )}
        <input
          type="text"
          placeholder="email"
          {...register("email", { required: true, pattern: EMAIL_VALIDATION })}
          className={`${errors.email ? style.error : ""}`}
        />
        {errors.email && (
          <p className={style.errorMessage}>Enter valid email address</p>
        )}
        <input
          type="password"
          placeholder="password"
          {...register("password", {
            required: true,
            pattern: PASSWORD_VALIDATION,
          })}
          className={`${errors.password ? style.error : ""}`}
        />
        {errors.password && (
          <p className={style.errorMessage}>Enter valid password</p>
        )}

        <button>{isRegister ? "Signup" : "Login"}</button>
        <button
          type="button"
          className="secondary-btn"
          onClick={() =>
            router.push(`${isRegister ? "/user/login" : "/user/signup"}`)
          }
        >
          {isRegister ? "Login" : "Signup"}
        </button>
      </form>
    </>
  );
};

export default UserForm;
