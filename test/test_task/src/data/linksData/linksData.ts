import { BasketPage } from '../../pages/BasketPage';
import { ShopPage } from '../../pages/ShopPage';
import type { typeLinksData, typeRoutesData } from '../../types/model';

export const linksData: typeLinksData[] = [
    {
        id: 1,
        linkSrc: '/',
        nameLink: 'Магазин',
    },
    {
        id: 2,
        linkSrc: '/basket',
        nameLink: 'Корзина',
    },
];

export const routesData: typeRoutesData[] = [
    {
        id: 1,
        path: '/',
        nameElement: ShopPage,
    },
    {
        id: 2,
        path: '/basket',
        nameElement: BasketPage,
    },
];