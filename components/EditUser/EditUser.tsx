import { SubmitHandler, useForm } from "react-hook-form";
import { EMAIL_VALIDATION } from "../../utils/consts";
import style from "./EditUser.module.css";

interface EditUserInputs {
  name: string;
  email: string;
  isAdmin: boolean;
}

export default function EditUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditUserInputs>();

  const onSubmit: SubmitHandler<EditUserInputs> = async (data) => {
    console.log(data);
  };
  return (
    <div className={style.background}>
      <div className={style.wrapper}>
        <form onSubmit={handleSubmit(onSubmit)} className={style.wrapper}>
          <input
            type="text"
            placeholder="name"
            {...register("name", { required: true })}
            className={`${errors.name ? style.error : ""}`}
          />
          {errors.name && (
            <p className={style.errorMessage}>Name is required</p>
          )}

          <input
            type="text"
            placeholder="email"
            {...register("email", {
              required: true,
              pattern: EMAIL_VALIDATION,
            })}
            className={`${errors.email ? style.error : ""}`}
          />
          {errors.email && (
            <p className={style.errorMessage}>Enter valid email address</p>
          )}

          <button>Update User</button>
          <button
            type="button"
            className="secondary-btn"
            onClick={() => console.log("cancel")}
          >
            cancel
          </button>
        </form>
      </div>
    </div>
  );
}
