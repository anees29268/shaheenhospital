// middleware.js
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const { pathname } = req.nextUrl;
    const user = req.nextauth.token;

    // For paths under /admin
    if (pathname.startsWith("/admin")) {
      if (!user || user.role !== "admin") {
        return NextResponse.redirect(new URL("/forbidden", req.url));
      }
    }

    // For all other paths, ensure the user is authenticated
    if (!user) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      authorized: async ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/((?!login|forbidden).*)", // Exclude login and forbidden pages from middleware
  ],
};
