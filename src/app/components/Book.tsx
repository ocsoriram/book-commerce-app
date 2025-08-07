"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BookType, User } from "../type/type";

type bookProps = {
  book: BookType;
  isPurchased: boolean;
  user: User;
};

// REFACTOR メモ化を考える. isPurchaseが変更された時だけ変更が走る.
const Book = ({ book, isPurchased, user }: bookProps) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleConfirm = () => {
    // TODO 購入済みなら記事ページに遷移させることも考える
    if (isPurchased) {
      alert("その商品は購入済みです");
    } else {
      setShowModal(true);
    }
  };

  // refactor useCallback パフォーマンスへの影響は小さい
  const handleCancel = () => {
    setShowModal(false);
  };

  const startCheckout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application.json",
          },
          body: JSON.stringify({
            title: book.title,
            price: book.price,
            userId: user?.id,
            bookId: book.id,
          }),
        }
      );
      const responseData = await response.json();

      if (responseData) {
        router.push(responseData.checkout_url);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePurchaseOnClick = () => {
    if (!user) {
      // ログイン画面にリダイレクト
      router.push("/login");
      return;
    }
    // Stripeで購入処理を実行
    startCheckout();
  };

  return (
    <>
      {/* アニメーションスタイル */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .modal {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>

      <div className="flex flex-col items-center m-4">
        <a className="cursor-pointer shadow-2xl duration-300 hover:translate-y-1 hover:shadow-none">
          <Image
            priority
            src={book.thumbnail.url}
            alt={book.title}
            width={450}
            height={350}
            className="rounded-t-md bg-stone-100/10"
            onClick={handleConfirm}
          />
          <div className="px-4 py-4 bg-slate-100 rounded-b-md">
            <h2 className="text-lg font-semibold">{book.title}</h2>
            {/* <p className="mt-2 text-lg text-slate-600"></p> */}
            <p className="mt-2 text-md text-slate-700">値段：{book.price}</p>
          </div>
        </a>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/80 flex justify-center items-center z-50 modal">
          <div className="bg-white p-8 rounded-lg">
            <h3 className="text-xl mb-4">本を購入しますか？</h3>
            <button
              onClick={handlePurchaseOnClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
            >
              購入する
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              キャンセル
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Book;
