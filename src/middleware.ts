import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privatePaths = ["/me"];
const publicPaths = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("sessionToken")?.value;
  if (privatePaths.some((path) => pathname.startsWith(path)) && !sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (publicPaths.some((path) => pathname.startsWith(path)) && sessionToken) {
    return NextResponse.redirect(new URL("/me", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [...privatePaths, ...publicPaths],
};
