import { runCalcPrices } from '../components/calcPrices';
import { debounce } from '../utils';
import { PAGE_READY_ELEMENT_SELECTOR, PageType, PARAMS } from '../constants';
import { Page } from './page';

const debouncedCalcPrices = debounce(runCalcPrices, 300);

const preparePage = async (): Promise<void> => {
    const offersSection = document.querySelector(PARAMS.PRODUCT_OFFERS_SECTIONS);
    if (!offersSection) {
        return;
    }

    // Дополнительно следим за секцией "Цены"
    const observer = new MutationObserver(debouncedCalcPrices);
    observer.observe(offersSection, {
        childList: true,
        subtree: true,
    });
};

const run = async (): Promise<void> => {
    runCalcPrices();
};

export const productPage = new Page({
    pageType: PageType.PRODUCT,
    pageReadyElementSelector: PAGE_READY_ELEMENT_SELECTOR.PRODUCT,
    onPreparePage: preparePage,
    onRun: run,
});
