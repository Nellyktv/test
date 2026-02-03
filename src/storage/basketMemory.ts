import type { BasketThing } from '../types/model';

const KEY = "basket_data_v2";

export function readBasket(): BasketThing[] {
    try {
        return JSON.parse(localStorage.getItem(KEY) || "[]");
    } catch {
        return [];
    }
}

export function writeBasket(list: BasketThing[]) {
    localStorage.setItem(KEY, JSON.stringify(list));
}