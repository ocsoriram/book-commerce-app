import prisma from "@/app/lib/prisma";
import { client } from "./../../../microcms/client";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// 購入履歴の保存
export async function POST(request: Request, response: Response) {
  // sessionIdから情報を取り出すため
  const { sessionId } = await request.json();

  // 複数回使用するので、別ファイルでの定義を検討
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const existingPurchase = await prisma.purchase.findFirst({
      where: {
        userId: session.client_reference_id!,
        bookId: session.metadata?.bookId,
      },
    });

    // session.metadata?.bookId!は非推奨なので、動画と違いここでnull checkを行う.
    if (!session.metadata || !session.metadata.bookId) {
      throw new Error("bookIdがありません");
    }

    // すでに同じ購入データがDBに保存されているか確認。なければ保存処理を実行。
    if (existingPurchase) {
      const purchase = await prisma.purchase.create({
        data: {
          userId: session.client_reference_id!,
          bookId: session.metadata.bookId!,
        },
      });
      return NextResponse.json(purchase);
    } else {
      return NextResponse.json({ message: "すでに購入済みです" });
    }
  } catch (err) {
    return NextResponse.json(err);
  }
}
