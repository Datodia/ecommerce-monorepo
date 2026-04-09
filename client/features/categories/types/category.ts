export type Category = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  images: string;
};

export type CategoriesResponse = {
  data: Category[];
  page: number;
  total: number;
  last_page: number;
};
