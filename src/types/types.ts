export interface ApiProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    category: string;
    sizes: string[];
    color: string;
    rating?: {
        rate: number;
        count: number;
    };
}

export interface CartItem extends Product {
    quantity: number;
    selectedSize: string;
}

export interface ShoppingCart {
    items: CartItem[];
    total: number;
}