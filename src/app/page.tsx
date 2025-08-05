// "use client";

import { getServerSession } from "next-auth";
import Book from "./components/Book";
import { nextAuthOptions } from "./lib/next-auth/options";
import { getAllBooks } from "./microcms/client";
import { Purchase, PurchaseBookIds, User } from "./type/type";

export default async function Home() {
  const { contents } = await getAllBooks();
  // サーバサイドでセッションから情報を取得する
  const session = await getServerSession(nextAuthOptions);
  // as 型　の指定で、値が存在する時に硬キャストする、という意味になる。
  const user = session?.user as User;

  let purchaseBookIds: PurchaseBookIds;

  // ユーザーが存在すれば、購入済みの書籍データを取得する
  if (user) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`
    );
    const purchasesData = await response.json();
    // console.log("purchaseData:", purchasesData);

    purchaseBookIds = purchasesData.map(
      (purchaseBook: Purchase) => purchaseBook.bookId
    );
    // console.log(purchaseBookIds);
  }
  return (
    <>
      <main className="flex flex-wrap justify-center items-center md:mt-32 mt-20">
        <h2 className="text-center w-full font-bold text-3xl mb-2">
          Book Commerce
        </h2>
        {contents.map((book) => (
          <Book
            key={book.id}
            book={book}
            isPurchased={purchaseBookIds.includes(book.id)}
          />
        ))}
      </main>
    </>
  );
}
