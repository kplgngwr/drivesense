import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type AppUser = {
  id: string;
  email: string;
  name?: string | null;
  _id?: string;
  isVerified?: boolean;
  username?: string;
};

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "name@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        // Replace this placeholder logic with a real authentication request.
        // Returning null keeps the credentials flow disabled until wired up.
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const appUser = user as AppUser;
        token._id = appUser._id;
        token.isVerified = appUser.isVerified;
        token.username = appUser.username ?? appUser.name ?? undefined;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user._id = token._id as string | undefined;
        session.user.isVerified = token.isVerified as boolean | undefined;
        session.user.username = token.username as string | undefined;
      }

      return session;
    },
  },
};
