import NextAuth from "next-auth";
import { getNextAuthOptions } from "@/app/lib/next-auth/options";

const handler = NextAuth(getNextAuthOptions());

export { handler as GET, handler as POST };
