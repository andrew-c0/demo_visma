import { Product } from "./interfaces/product"
import { Rebate } from "./interfaces/rebates"
import { User } from "./interfaces/user"

export const users: User[] = [
    {username: "demo_admin", password: '1234', userType: "admin"},
    {username: "demo_client", password: '1234', userType: "client"}
]

export const products: Product[] = [
    {id: 1001, name: "Office Chair", price: 300, category: "chairs"},
    {id: 1002, name: "Office Desk", price: 600, category: "desks"},
    {id: 1003, name: "Bedroom Bed", price: 1300, category: "beds"},
    {id: 1004, name: "Gaming Chair", price: 450, category: "chairs"},
    {id: 1005, name: "Table Chair", price: 120, category: "chairs"},
    {id: 1006, name: "School Desk", price: 250, category: "desks"},
    {id: 1007, name: "Living Room Sofa", price: 1600, category: "beds"},
    {id: 1008, name: "Outside Bed", price: 1200, category: "beds"}
]

export const rebates: Rebate[] = [
    {rebateSubject: 'orders', rebateCriteria: 'bigger than', rebateValue: 50, rebatePercentage: 0.03, productSpecific: false},
    {rebateSubject: 'age', rebateCriteria: 'bigger than', rebateValue: 1, rebatePercentage: 0.05, productSpecific: false},
    {rebateSubject: 'orders', rebateCriteria: 'min', rebateValue: 3000, rebatePercentage: 0.1, productSpecific: false}
]