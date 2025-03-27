import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
    signUp: "/signup",
  },
});

export const config = {
  matcher: ["/checkout/:path*", "/profile/:path*", "/orders/:path*"],
};
