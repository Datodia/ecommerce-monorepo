import { http } from "@/shared/lib/http";
import { CategoriesResponse } from "../types/category";

export const getCategories = async () => {
  const response = await http.get<CategoriesResponse>("/categories");
  return response;
};
