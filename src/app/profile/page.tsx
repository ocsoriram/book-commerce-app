import { getServerSession } from "next-auth";
import Image from "next/image";
import PurchaseDetailBook from "../components/PurchaseDetailBook";
import { getNextAuthOptions } from "../lib/next-auth/options";
import { getDetailBook } from "../microcms/client";
import { BookType, Purchase, User } from "../type/type";

export default async function ProfilePage() {
  // FIXME useContextAPIやreduxで１箇所での管理することを考える.
  const session = await getServerSession(getNextAuthOptions());
  const user = session?.user as User;

  // ユーザーが存在すれば、購入済みの書籍データを取得する
  // ユーザー情報から購入済データ取得→bookIdのみのリスト作成→bookの詳細データ取得
  let purchaseDetailBooks: BookType[] = [];
  if (user) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`
    );
    const purchasesData = await response.json();

    const purchaseBookIds = purchasesData.map(
      (purchaseBook: Purchase) => purchaseBook.bookId
    );

    purchaseDetailBooks = await Promise.all(
      purchaseBookIds.map(async (purchaseBookId: string) => {
        return await getDetailBook(purchaseBookId);
      })
    );
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">プロフィール</h1>

      <div className="bg-white shadow-md rounded p-4">
        <div className="flex items-center">
          <Image
            priority
            src={user?.image || "/default_icon.png"}
            alt="user profile_icon"
            width={60}
            height={60}
            className="rounded-t-md"
          />
          <h2 className="text-lg ml-4 font-semibold">お名前：{user?.name}</h2>
        </div>
      </div>

      <span className="font-medium text-lg mb-4 mt-4 block">購入した記事</span>
      <div className="flex items-center gap-6 flex-col md:flex-row ">
        {purchaseDetailBooks.map((purchaseDetailBook: BookType) => {
          return (
            <PurchaseDetailBook
              key={purchaseDetailBook.id}
              purchaseBook={purchaseDetailBook}
            />
          );
        })}
      </div>
    </div>
  );
}
