import type { BasketThing } from '../types/model';

const KEY = "basket_data_v2";

export function readBasket(): BasketThing[] {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return [];
    }
    const data = window.localStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.warn("Failed to read basket from localStorage", e);
    return [];
  }
}

export function writeBasket(list: BasketThing[]) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(KEY, JSON.stringify(list));
    }
  } catch (e) {
    console.warn("Failed to write basket to localStorage", e);
  }
}