import { runCalcPrices } from '../components/calcPrices';
import { handleChangeSortToggle, runAutoSortProducts, manualSortProducts } from '../components/sortProducts';
import { PAGE_READY_ELEMENT_SELECTOR, PageType, PARAMS } from '../constants';
import { catalogObserver } from '../components/catalogObserver';
import { cn } from '../utils';
import { Page } from './page';
import { createButton } from '../components/button';
import { refreshPriceIcon, sortIcon } from '../icons';
import { createToggle } from '../components/toggle';

const injectToolbar = (): void => {
    const mmToolbarFilter = document.querySelector(PARAMS.CATALOG_FILTER_SELECTOR);
    const mrpToolbar = cn('div', { class: PARAMS.MRP_TOOLBAR_CLASSNAME }, []);
    mmToolbarFilter.before(mrpToolbar);
};

const fillToolbar = async (): Promise<void> => {
    try {
        const toolbar = document.querySelector(`.${PARAMS.MRP_TOOLBAR_CLASSNAME}`);
        const checked = await GM.getValue<boolean>(PARAMS.SORT_TOGGLE_KEY);

        const autoSortToggle = createToggle({
            checked,
            text: 'Автосортировка',
            attrs: { title: 'Вкл/Выкл автоматической сортировки по "красным" ценникам' },
            onChange: handleChangeSortToggle,
        });

        const manualSortButton = createButton({
            text: 'Ручная сортировка',
            attrs: { title: 'Ручная сортировка по "красным" ценникам' },
            icon: sortIcon,
            onClick: manualSortProducts,
        });

        const calcPricesButton = createButton({
            text: 'Пересчет цен',
            attrs: { title: 'Ручной запуск подсчета цен с учетом бонусов' },
            icon: refreshPriceIcon,
            onClick: runCalcPrices,
        });

        toolbar.append(autoSortToggle, manualSortButton, calcPricesButton);
    } catch (e) {
        console.log('MRP.sortProducts.fillToolbar: ', e);
    }
};

const onCatalogChange = async (): Promise<void> => {
    await runCalcPrices();
    await runAutoSortProducts();
};

const preparePage = async (): Promise<void> => {
    const catalogWrapper = document.querySelector(PARAMS.CATALOG_WRAPPER_SELECTOR);
    const catalogFilter = document.querySelector(PARAMS.CATALOG_FILTER_SELECTOR);
    const mrpToolbar = document.querySelector(PARAMS.MRP_TOOLBAR_CLASSNAME);

    // Следим за изменениями в каталоге
    if (catalogWrapper) {
        catalogObserver(catalogWrapper, onCatalogChange);
    }

    // Добавляем наш тулбар на страницу
    if (catalogFilter && !mrpToolbar) {
        injectToolbar();
        fillToolbar();
    }
};

const run = async (): Promise<void> => {
    try {
        const catalogWrapper = document.querySelector(PARAMS.CATALOG_WRAPPER_SELECTOR);

        await runCalcPrices();

        if (catalogWrapper) {
            await runAutoSortProducts();
        }
    } catch (e) {
        console.log('MRP.commonPage.run', e);
    }
};

export const commonPage = new Page({
    pageType: PageType.COMMON,
    pageReadyElementSelector: PAGE_READY_ELEMENT_SELECTOR.COMMON,
    onPreparePage: preparePage,
    onRun: run,
});
