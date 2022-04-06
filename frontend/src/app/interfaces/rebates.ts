import { Product } from "./product";

export interface Rebate {
    rebateSubject: 'orders' | 'age',
    rebateCriteria: 'min' | 'max' | 'bigger than' | 'lower than',
    rebateValue: number,
    rebatePercentage: number,
    productSpecific: boolean,
    productRebate?: Product  
}