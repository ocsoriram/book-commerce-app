import NextAuth, { NextAuthOptions } from "next-auth";
import { getNextAuthOptions } from "@/app/lib/next-auth/options";

export const runtime = "nodejs";

const authOptions: NextAuthOptions = getNextAuthOptions();

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
