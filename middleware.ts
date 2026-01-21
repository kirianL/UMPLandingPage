import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const locales = ["es", "en"];
const defaultLocale = "es";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1. Check for assets, admin, api, etc. to skip i18n
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/assets") ||
    pathname.match(/\.(png|jpg|jpeg|webp|svg|ico)$/)
  ) {
    return await updateSession(request);
  }

  // 2. Check if pathname already has locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    // Valid locale, proceed with auth check
    return await updateSession(request);
  }

  // 3. Redirect if missing locale
  const locale = defaultLocale;
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
