import { Page } from './page';
import { PAGE_READY_ELEMENT_SELECTOR, PageType, PARAMS } from '../constants';
import { catalogObserver } from '../components/catalogObserver';
import { runCalcPrices } from '../components/calcPrices';

const preparePage = async (): Promise<void> => {
    const catalogWrapper = document.querySelector(PARAMS.FAVORITES_CATALOG_WRAPPER_SELECTOR);

    if (catalogWrapper) {
        catalogObserver(catalogWrapper, runCalcPrices);
    }
};

const run = async (): Promise<void> => {
    runCalcPrices();
};

export const favoritesPage = new Page({
    pageType: PageType.FAVORITES,
    pageReadyElementSelector: PAGE_READY_ELEMENT_SELECTOR.FAVORITES,
    onPreparePage: preparePage,
    onRun: run,
});
