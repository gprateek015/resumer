import NextAuth, { type Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT, JWTDecodeParams, JWTEncodeParams } from "next-auth/jwt";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import type { Adapter } from "next-auth/adapters";
import client from "../lib/db";

import Axios from "@/actions";

const handler = NextAuth({
  adapter: MongoDBAdapter(client) as Adapter,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error("Email and Password are required");
        const { email, password } = credentials;
        const response = await Axios.post("/user/login", { email, password });
        return response.data;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user, token }) {
      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  //Todo: update this for security or remove it
  //* By default it is encrypted (JWE)
  jwt: {
    async encode(params: JWTEncodeParams): Promise<string> {
      // return a custom encoded JWT string
      return jwt.sign(params.token!, params.secret);
    },
    async decode(params: JWTDecodeParams): Promise<JWT | null> {
      // return a `JWT` object, or `null` if decoding failed
      return jwt.verify(params.token!, params.secret) as JwtPayload;
    },
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production" ? true : false,
        domain:
          process.env.NODE_ENV === "production" ? ".prateeklab.com" : undefined,
      },
    },
  },
});

export { handler as GET, handler as POST };
