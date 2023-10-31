import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log(auth, "auth");
      console.log(Request, "request");
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        console.log("inside if");
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        console.log("inside el if");

        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      console.log("otsie if el");
      return true;
    },
  },
} satisfies NextAuthConfig;
