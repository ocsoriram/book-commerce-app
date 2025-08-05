type BookType = {
  id: string;
  title: string;
  content: string;
  price: number;
  thumbnail: { url: string };
  createdAt: string;
  deletedAt: string;
  publishedAt: string;
  updatedAt: string;
};

type User =
  | {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  | undefined;

type PurchaseBookIds = string[];

type Purchase = {
  id: string;
  userId: StringConstructor;
  bookId: string;
  createdAt: string;
  user: User;
};

export type { BookType, User, PurchaseBookIds, Purchase };
