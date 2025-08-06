// middleware.ts
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // ここでは仮にCookie名が "auth_token" の有無で判断
  console.log("GITHUB_ID@middleware:", process.env.GITHUB_ID!.slice(0, 6));

  console.log(
    "NEXTAUTH_SECRET@runtime@middleware:",
    process.env.NEXTAUTH_SECRET?.slice(0, 6) || "undefined"
  );

  console.log(
    "AUTH_SECRET@runtime@middleware:",
    process.env.AUTH_SECRET?.slice(0, 6) || "undefined"
  );

  console.log("request@middleware:", request);
}
