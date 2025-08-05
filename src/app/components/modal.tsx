"use client";
export const modal = () => {
  return (
    <>
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-900 bg-opacity-50 flex justify-center items-center modal">
        <div className="bg-white p-8 rounded-lg">
          <h3 className="text-xl mb-4">本を購入しますか？</h3>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
            購入する
          </button>
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            キャンセル
          </button>
        </div>
      </div>
    </>
  );
};
