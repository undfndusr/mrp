export enum PageType {
    'BASKET' = 'BASKET', // Корзина
    'CHECKOUT' = 'CHECKOUT', // Корзина. Оформление
    'COMMON' = 'COMMON', // Страница каталога и все остальные
    'PRODUCT' = 'PRODUCT', // Страница с товаром
    'FAVORITES' = 'FAVORITES', // Избранное
}

export const urlPathByPage = {
    [PageType.BASKET]: '/multicart/',
    [PageType.CHECKOUT]: '/multicart/checkout/',
    [PageType.PRODUCT]: '/catalog/details/',
    [PageType.FAVORITES]: '/personal/favorites/',
};

// Элементы, по наличию которых можно понять, что данные на странице подгрузились
export const PAGE_READY_ELEMENT_SELECTOR: Record<PageType, string> = {
    [PageType.BASKET]: '.multicart-item__summary',
    [PageType.CHECKOUT]: '.precheck-block',
    [PageType.COMMON]: '[data-product-id]',
    [PageType.FAVORITES]: '[data-product-id]',
    [PageType.PRODUCT]: '.pdp-sales-block .bonus-amount',
};

export const PARAMS = {
    INIT_DELAY: 2000, // Начальная задержка перед стартом, чтобы дождаться завершения всяких анимаций и прочего
    REAL_PRICE_CLASSNAME: 'mrp-real-price',
    MRP_TOOLBAR_CLASSNAME: 'mrp-toolbar',
    CATALOG_WRAPPER_SELECTOR: '.r',
    CATALOG_FILTER_SELECTOR: '.r .filter',
    BASKET_TOTAL_PRICE_SELECTOR: '[class*="__total-price-value"]',
    PRODUCT_SELECTOR: '[id][data-product-id]',
    PRODUCT_PRICE_SELECTOR: '.item-price',
    PRODUCT_OFFERS_SECTIONS: '.product-offers',
    FAVORITES_CATALOG_WRAPPER_SELECTOR: '.personal-listing__container',
    SORT_TOGGLE_KEY: 'sortToggle',
    CURRENT_PAGE_URL_KEY: 'currentPageUrl',
};

// Все разделы, содержащие цены (со всех страниц)
// Держим в одном месте, т.к. одни и те же разделы могут встречаться на разных страницах
export const sectionsWithPriceElements = [
    // Страница товара. Основной блок с ценой
    {
        wrapperSelector: '.pdp-sales-block',
        priceSelector: '[class*="__price-final"]',
        bonusSelector: '.bonus-amount',
    },
    // Страница товара. Блоки "Похожие товары" + "Рекомендуем также"
    {
        wrapperSelector: '.product-list-item-price__money',
        priceSelector: '.amount',
        bonusSelector: '.bonus-amount',
    },
    // Страница товара. Блок "Цены"
    {
        wrapperSelector: '.product-offer-price',
        priceSelector: '.product-offer-price__amount',
        bonusSelector: '.bonus-amount',
    },
    // Страница товара. Блок "Вы недавно смотрели"
    {
        wrapperSelector: '.goods-item-card__money',
        priceSelector: '.goods-item-card__amount',
        bonusSelector: '.bonus-amount',
    },
    // Страница каталога. Цены товаров
    {
        wrapperSelector: '.item-money',
        priceSelector: '.item-price',
        bonusSelector: '.bonus-amount',
    },
    // Корзина. Финальная цена
    {
        wrapperSelector: '.multicart-item__summary',
        priceSelector: '.cart-summary-redesign__total-price-value',
        bonusSelector: '.bonus-amount',
    },
    // Корзина. Товары
    {
        wrapperSelector: '.cart-item-price',
        priceSelector: '.price',
        bonusSelector: '.bonus-amount',
    },
    // Корзина. Оформление
    {
        wrapperSelector: '.precheck-block',
        priceSelector: '.precheck-block__total-text',
        bonusSelector: '.bonus-amount',
    },
];
