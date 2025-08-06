import NextAuth, { NextAuthOptions } from "next-auth";
import { getNextAuthOptions } from "@/app/lib/next-auth/options";

export const runtime = "nodejs";

const authOptions: NextAuthOptions = getNextAuthOptions();

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

console.log(
  "NEXTAUTH_SECRET@runtime:",
  process.env.NEXTAUTH_SECRET?.slice(0, 6) || "undefined"
);

console.log(
  "AUTH_SECRET@runtime:",
  process.env.AUTH_SECRET?.slice(0, 6) || "undefined"
);
