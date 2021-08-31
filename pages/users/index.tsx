import { GetStaticProps } from "next";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/user";

export const getStaticProps: GetStaticProps = async () => {
  await dbConnect();
  const usersList = await User.find({}).select("-password");

  if (usersList.length === 0) return { notFound: true };

  return {
    props: { usersList: JSON.stringify(usersList) },
  };
};

export default function Users({ usersList }: any) {
  const users = JSON.parse(usersList);
  return <h1>users list</h1>;
}
