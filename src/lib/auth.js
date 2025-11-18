import { CMSControllerLogin } from "@/modules/cmsModule/controller";
import { ConsoleSqlOutlined } from "@ant-design/icons";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Mahar CMS",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await CMSControllerLogin(credentials);
        if (!user) {
          return false;
        }
        return {
          name: user.name,
          email: user.email,
          id: user.cmsUserId,
          permissions:
            user.accessLevel.length > 0 ? user.accessLevel[0].permissions : [],
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          permissions: token.permissions,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
          permissions: user.permissions,
        };
      }
      return token;
    },
  },
};
