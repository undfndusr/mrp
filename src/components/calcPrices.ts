import { cn, createLogger, digitsOnly } from '../utils';
import { PARAMS, sectionsWithPriceElements } from '../constants';

const debug = false;
const log = createLogger(debug);

const priceFormatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
});

const setRealPrice = params => {
    const { wrapperEl, priceSelector = '.item-price', bonusSelector = '.bonus-amount', realPriceClassName } = params;

    debug && console.groupCollapsed('setRealPrice start');
    log('---- wrapperEl', wrapperEl);

    const priceEl = wrapperEl.querySelector(priceSelector);
    const bonusEl = wrapperEl.querySelector(bonusSelector);
    const realPriceEl = wrapperEl.querySelector(`.${realPriceClassName}`);

    log('---- priceEl', priceSelector, priceEl);
    log('---- bonusEl', bonusSelector, bonusEl);
    log('---- realPriceEl', realPriceEl);

    if (!priceEl || !bonusEl) {
        log('setRealPrice cancel');
        debug && console.groupEnd();
        return;
    }

    const priceValue = digitsOnly(priceEl.firstChild.textContent.trim());
    const bonusValue = digitsOnly(bonusEl.firstChild.textContent.trim());

    log('---- priceValue', priceValue);
    log('---- bonusValue', bonusValue);

    const newPriceValue = +priceValue - +bonusValue;
    log('---- newPriceValue', newPriceValue);

    const newPriceFormatted = ` (${priceFormatter.format(newPriceValue)})`;
    log('---- newPriceFormatted', newPriceFormatted);

    if (realPriceEl) {
        realPriceEl.textContent = newPriceFormatted;
        log('---- realPriceEl', realPriceEl);
    } else {
        const parentId = priceEl.closest(PARAMS.PRODUCT_SELECTOR)?.id;
        const newPriceEl = cn('div', { class: realPriceClassName, 'data-parent-id': parentId }, [newPriceFormatted]);
        log('---- newPriceEl', newPriceEl);
        priceEl.append(newPriceEl);
    }

    log('setRealPrice end');
    debug && console.groupEnd();
};

const calcPrices = async (): Promise<void> => {
    debug && console.log('calcPrices start');

    sectionsWithPriceElements.forEach(({ wrapperSelector, priceSelector, bonusSelector }) => {
        const wrappers = document.querySelectorAll(wrapperSelector);

        debug && console.log('calcPrices wrappers', wrappers);

        wrappers.forEach(wrapperEl => {
            setRealPrice({
                wrapperEl,
                priceSelector,
                bonusSelector,
                realPriceClassName: PARAMS.REAL_PRICE_CLASSNAME,
            });
        });
    });

    debug && console.log('calcPrices end');
};

export const runCalcPrices = async (): Promise<void> => {
    await calcPrices();
};
