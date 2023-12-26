import { runCalcPrices } from '../components/calcPrices';
import { PAGE_READY_ELEMENT_SELECTOR, PageType, PARAMS } from '../constants';
import { Page } from './page';

const preparePage = async (): Promise<void> => {
    const totalPriceEl = document.querySelector(PARAMS.BASKET_TOTAL_PRICE_SELECTOR);

    // Следим за изменением итоговой цены корзины (вместо слежки за каждым товаром)
    const observer = new MutationObserver(([mutation]) => {
        const newValue = mutation.target.textContent.trim();

        if (mutation.oldValue !== newValue) {
            runCalcPrices();
        }
    });

    observer.observe(totalPriceEl, {
        characterData: true,
        attributes: false,
        childList: false,
        subtree: true,
        characterDataOldValue: true,
    });
};

const run = async (): Promise<void> => {
    runCalcPrices();
};

export const basketPage = new Page({
    pageType: PageType.BASKET,
    pageReadyElementSelector: PAGE_READY_ELEMENT_SELECTOR.BASKET,
    onPreparePage: preparePage,
    onRun: run,
});
