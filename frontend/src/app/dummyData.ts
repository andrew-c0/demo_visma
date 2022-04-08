import { Product } from "./interfaces/product"
import { Rebate } from "./interfaces/rebates"
import { User } from "./interfaces/user"

export const users: User[] = [
    {username: "demo_admin", password: '1234', userType: "admin"},
    {username: "demo_client", password: '1234', userType: "client"}
]

export const rebates: Rebate[] = [
    {rebateSubject: 'orders', rebateCriteria: 'bigger than', rebateValue: 50, rebatePercentage: 0.03, productSpecific: false},
    {rebateSubject: 'age', rebateCriteria: 'bigger than', rebateValue: 1, rebatePercentage: 0.05, productSpecific: false},
    {rebateSubject: 'orders', rebateCriteria: 'min', rebateValue: 3000, rebatePercentage: 0.1, productSpecific: false}
]