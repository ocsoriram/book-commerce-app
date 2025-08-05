import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

// 購入履歴検索API
export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const parameters = await params;
  const userId = parameters.userId;

  try {
    const purchases = await prisma.purchase.findMany({
      where: { userId: userId },
    });

    // console.log("log at route.ts", purchases);
    return NextResponse.json(purchases);
  } catch (err) {
    return NextResponse.json(err);
  }
}
