import { Product } from "@/features/products/types/product";

export type CartListItem = {
	itemId?: string;
	productId: string;
	name: string;
	thumbnail: string;
	price: string;
	quantity: number;
};

export type CartApiItem = {
	id: string;
	cartId: string;
	productId: string;
	quantity: number;
	product: Product;
};

export type CartApi = {
	id: string;
	userId: string;
	totalAmount: string | number;
	items: CartApiItem[];
	createdAt: string;
	updatedAt: string;
};
