import { BasketItemModel } from "./basket-item-model";

export interface BasketModel {
    userName: string;
    items: BasketItemModel[];
    totalPrice: number;
}