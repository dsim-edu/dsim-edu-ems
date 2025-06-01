import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const cookie = await cookies();
  cookie.delete("auth_token");
  const url =
    "https://madrasha-management-system.vercel.app?name=Darussunnah%20Islamia%20Madrasha&password=882353567&username=emsptxhjw";
  return NextResponse.redirect(new URL(url, req.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
