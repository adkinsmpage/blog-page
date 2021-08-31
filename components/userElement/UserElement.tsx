import style from "./UserElement.module.css";

interface IUserElement {
  user: { isAdmin: boolean; _id: string; name: string; email: string };
}

const UserElement = ({ user }: IUserElement) => {
  return <h1>user</h1>;
};

export default UserElement;
