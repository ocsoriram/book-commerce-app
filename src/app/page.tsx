// "use client";

import { getServerSession } from "next-auth";
import Book from "./components/Book";
import { nextAuthOptions } from "./lib/next-auth/options";
import { getAllBooks } from "./microcms/client";

export default async function Home() {
  const { contents } = await getAllBooks();
  // サーバサイドでセッションから情報を取得する
  const session = await getServerSession(nextAuthOptions);
  const user: any = session?.user;

  let purchaseBookIds: any;

  // ユーザーが存在すれば、購入済みの書籍データを取得する
  if (user) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`
    );
    const purchasesData = await response.json();
    // console.log("purchaseData:", purchasesData);

    purchaseBookIds = purchasesData.map(
      (purchaseBook: any) => purchaseBook.bookId
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
