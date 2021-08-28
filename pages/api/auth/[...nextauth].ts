import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import dbConnect from "../../../lib/dbConnect";

import User from "../../../models/user";

type TypeCredentials = {
  email: string;
  password: string;
};

export default NextAuth({
  session: {
    jwt: true,
  },
  callbacks: {
    jwt(token, profile) {
      if (profile) {
        return { ...token, user: profile };
      }
      return token;
    },
    session(session, token) {
      return token;
    },
  },

  providers: [
    Providers.Credentials({
      async authorize(credentials: TypeCredentials) {
        await dbConnect();

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("User Not Found");
        }
        const isPasswordCorrect = await user.correctPassword(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Could not log you in");
        }

        return {
          email: user.email,
          name: user.name,
          id: user._id,
          isAdmin: user.isAdmin,
        };
      },
    }),
  ],
});
