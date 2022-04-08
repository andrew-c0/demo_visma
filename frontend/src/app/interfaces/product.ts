export interface AddProduct {
    name: string,
    price: number,
    category: string
}

export interface Product {
    id: number,
    name: string, 
    price: number,
    category: string,
    created_at: string,
    is_active: boolean
}