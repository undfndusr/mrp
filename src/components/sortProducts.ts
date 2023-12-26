import { cn, createLogger, digitsOnly } from '../utils';
import { PARAMS } from '../constants';
import { sortIcon } from '../icons';

const debug = false;
const log = createLogger(debug);

const getPriceFromProduct = product => {
    if (!product) {
        return;
    }

    const realPrice = product.querySelector(`.${PARAMS.REAL_PRICE_CLASSNAME}`)?.textContent;
    const price = product.querySelector(PARAMS.PRODUCT_PRICE_SELECTOR)?.textContent;
    const resultPrice = digitsOnly(realPrice || price);

    log('realPrice', realPrice);
    log('price', price);
    log('resultPrice', resultPrice);

    return resultPrice;
};

const sortFn = (a: Element, b: Element): number => {
    log('sort a', a);
    log('sort b', b);

    if (!a.hasAttribute('data-product-id')) {
        return 1;
    }

    if (!b.hasAttribute('data-product-id')) {
        return -1;
    }

    const aPrice = getPriceFromProduct(a);
    const bPrice = getPriceFromProduct(b);

    return aPrice - bPrice;
};

export const manualSortProducts = () => {
    console.log('manualSortProducts');

    const firstProduct = document.querySelector(PARAMS.PRODUCT_SELECTOR);

    if (!firstProduct) {
        return;
    }

    const currentOrderedCatalog = firstProduct.parentElement;

    Array.from(currentOrderedCatalog.children)
        .sort(sortFn)
        .forEach(node => currentOrderedCatalog.append(node));
};

export const handleChangeSortToggle = async (event: HtmlInputEvent): Promise<void> => {
    const checked = event.target.checked;

    if (checked) {
        manualSortProducts();
    }

    await GM.setValue(PARAMS.SORT_TOGGLE_KEY, checked);
};

export const runAutoSortProducts = async (): Promise<void> => {
    const checked = await GM.getValue<boolean>(PARAMS.SORT_TOGGLE_KEY);

    if (checked) {
        manualSortProducts();
    }
};
