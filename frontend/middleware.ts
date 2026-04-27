import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;

  const isAdminPage = path.startsWith("/admin");
  const isLoginPage = path === "/admin/login";

  // Belum login → tidak boleh ke admin
  if (!token && isAdminPage && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Sudah login → tidak boleh ke login
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // Sudah login → blok SEMUA halaman publik
  if (token && !isAdminPage) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // penting: jangan ganggu internal Next.js
    "/((?!_next|favicon.ico|api).*)",
  ],
};