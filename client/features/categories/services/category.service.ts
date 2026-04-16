import { http } from "@/shared/lib/http";
import { CategoriesResponse } from "../types/category";

export const getCategories = async (page?: number) => {
  const response = await http.get<CategoriesResponse>("/categories", {
    params: {
      page,
    },
  });
  return response;
};
