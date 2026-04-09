export type ProductCategory = {
	id: string;
	name: string;
	slug: string;
	createdAt: string;
	images: string;
};

export type Product = {
	id: string;
	slug: string;
	name: string;
	description: string;
	price: string;
	thumbnail: string;
	images: string[];
	category: ProductCategory;
};

export type ProductsResponse = {
    data: Product[];
    page: number;
    total: number;
    last_page: number;
}