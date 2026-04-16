export type OrderItem = {
	id: string;
	orderId: string;
	productId: string;
	productName: string;
	thumbnail: string | null;
	unitPrice: string | number;
	quantity: number;
	subtotal: string | number;
	createdAt: string;
	updatedAt: string;
};

export type Order = {
	id: string;
	userId: string;
	status: string;
	currency: string;
	subtotalAmount: string | number;
	totalAmount: string | number;
	address: string;
	phoneNumber: string;
	buildingNumber: string;
	additionalInfo?: string | null;
	stripeSessionId: string;
	stripePaymentIntentId?: string | null;
	items: OrderItem[];
	createdAt: string;
	updatedAt: string;
};