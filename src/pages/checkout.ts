import { runCalcPrices } from '../components/calcPrices';
import { debounce } from '../utils';
import { PAGE_READY_ELEMENT_SELECTOR, PageType } from '../constants';
import { Page } from './page';

const debouncedCalcPrice = debounce(runCalcPrices, 300);

const preparePage = async (): Promise<void> => {
    const precheckBlock = document.querySelector(PAGE_READY_ELEMENT_SELECTOR.CHECKOUT);
    const observer = new MutationObserver(debouncedCalcPrice);

    // Следим за всем блоком, т.к. изменения итоговой цены и бонусов очень непредсказуемы
    observer.observe(precheckBlock, {
        childList: true,
        subtree: true,
    });
};

const run = async (): Promise<void> => {
    runCalcPrices();
};

export const checkoutPage = new Page({
    pageType: PageType.CHECKOUT,
    pageReadyElementSelector: PAGE_READY_ELEMENT_SELECTOR.CHECKOUT,
    onPreparePage: preparePage,
    onRun: run,
});
