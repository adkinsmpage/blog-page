import { getSession, useSession } from "next-auth/client";
import { useEffect } from "react";

export default function ProfileScreen() {
  const sessionHandler = async () => {
    const session = await getSession();
  };
  useEffect(() => {
    sessionHandler();
  }, []);

  return <h1>Profile Screen</h1>;
}
