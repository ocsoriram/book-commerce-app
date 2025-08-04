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

  if (user) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`
    );
    const purchasesData = await response.json();
    console.log("purchaseData:", purchasesData);
  }

  return (
    <>
      <main className="flex flex-wrap justify-center items-center md:mt-32 mt-20">
        <h2 className="text-center w-full font-bold text-3xl mb-2">
          Book Commerce
        </h2>
        {contents.map((content) => (
          <Book key={content.id} book={content} />
        ))}
      </main>
    </>
  );
}
