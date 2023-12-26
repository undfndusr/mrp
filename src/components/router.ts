import { basketPage } from '../pages/basket';
import { commonPage } from '../pages/common';
import { checkoutPage } from '../pages/checkout';
import { favoritesPage } from '../pages/favorites';
import { productPage } from '../pages/product';
import { PageType } from '../constants';
import { isPage } from '../utils';

export const router = async (): Promise<void> => {
    if (isPage(PageType.PRODUCT)) {
        productPage.run();
        return;
    }

    if (isPage(PageType.CHECKOUT)) {
        checkoutPage.run();
        return;
    }

    if (isPage(PageType.BASKET)) {
        basketPage.run();
        return;
    }

    if (isPage(PageType.FAVORITES)) {
        favoritesPage.run();
        return;
    }

    commonPage.run();
};
