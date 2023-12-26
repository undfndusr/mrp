import { PARAMS } from '../constants';
import { debounce } from '../utils';

let firstProductId = '';

const mutationObserverCb = async (onChange: () => void): Promise<void> => {
    const firstProductEl = document.querySelector(PARAMS.PRODUCT_SELECTOR);

    if (!firstProductEl) {
        return;
    }

    console.log(`CatalogObserver debounced. Values: ${firstProductId} -> ${firstProductEl.id}`);

    if (firstProductId !== firstProductEl.id) {
        firstProductId = firstProductEl.id;
        onChange();
    }
};

const debouncedMutationObserverCb = debounce(mutationObserverCb, 300);

// Следит за изменением id первого товара в каталоге
export const catalogObserver = async (catalogWrapper: Element, onChange: () => void): Promise<void> => {
    console.log('CatalogObserver was run');

    try {
        // Обнуляем при старте
        firstProductId = '';

        const observer = new MutationObserver(async (): Promise<void> => {
            console.log('CatalogObserver run');

            debouncedMutationObserverCb(onChange);
        });

        observer.observe(catalogWrapper, {
            childList: true,
            subtree: true,
        });
    } catch (e) {
        console.log('MRP.catalogObserver: ', e);
    }
};
