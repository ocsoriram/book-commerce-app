"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BookType } from "../type/type";

type bookProps = {
  book: BookType;
};

const Book = ({ book }: bookProps) => {
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  const handleConfirm = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handlePurchaseOnClick = () => {
    if (!user) {
      // ログイン画面にリダイレクト
      router.push("/login");
      return;
    }

    // Stripeで購入処理を実行
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
            <p className="mt-2 text-lg text-slate-600">この本は○○...</p>
            <p className="mt-2 text-md text-slate-700">値段：{book.price}</p>
          </div>
        </a>
      </div>
      {showModal && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-900/80 flex justify-center items-center modal h-full">
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
