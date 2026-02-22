import { NextResponse, type NextRequest } from "next/server";

const LANDING_LOCALE = "en";
const LOCALE_COOKIE_NAME = "locale";
const COOKIE_MAX_AGE_SECONDS = 31536000;

function buildCookieHeaderWithLocale(rawCookieHeader: string, locale: string): string {
  const cookies = rawCookieHeader
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .filter((part) => !part.startsWith(`${LOCALE_COOKIE_NAME}=`));

  cookies.push(`${LOCALE_COOKIE_NAME}=${locale}`);
  return cookies.join("; ");
}

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname !== "/") {
    return NextResponse.next();
  }

  const requestHeaders = new Headers(request.headers);
  const currentCookieHeader = requestHeaders.get("cookie") ?? "";
  requestHeaders.set(
    "cookie",
    buildCookieHeaderWithLocale(currentCookieHeader, LANDING_LOCALE),
  );

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.cookies.set({
    name: LOCALE_COOKIE_NAME,
    value: LANDING_LOCALE,
    path: "/",
    maxAge: COOKIE_MAX_AGE_SECONDS,
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: ["/"],
};
