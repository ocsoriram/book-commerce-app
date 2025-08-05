import Image from "next/image";
import Link from "next/link";
import { BookType } from "../type/type";

type Props = {
  purchaseBook: BookType;
};

const PurchaseDetailBook = ({ purchaseBook }: Props) => {
  return (
    <Link
      href={`/book/${purchaseBook.id}`}
      className="cursor-pointer shadow-2xl duration-300 hover:translate-y-1 hover:shadow-none"
    >
      <Image
        priority
        src={purchaseBook.thumbnail.url}
        alt={purchaseBook.title}
        width={450}
        height={350}
        className="rounded-t-md"
      />
      <div className="px-4 py-4 rounded-b-md">
        <h2 className="text-lg font-semibold">{purchaseBook.title}</h2>
        {/* <p className="mt-2 text-lg text-slate-600">この本は○○...</p> */}
        <p className="mt-2 text-md text-slate-700">
          値段：{purchaseBook.price}円
        </p>
      </div>
    </Link>
  );
};

export default PurchaseDetailBook;
