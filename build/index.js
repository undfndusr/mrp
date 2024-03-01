// ==UserScript==
// @name         Megamarket Real Price
// @description  Выводит цены с учетом бонусов и добавляет сортировку по ним
// @version      2.0.6
// @author       undfndusr
// @license      MIT
// @match        *://*.megamarket.ru/*
// @namespace    http://tampermonkey.net/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=megamarket.ru
// @homepageURL  https://greasyfork.org/ru/scripts/483156-megamarket-real-price
// @run-at       document-end
// @grant        GM.setValue
// @grant        GM.getValue
// ==/UserScript==
var e;
(function (e) {
    e['BASKET'] = 'BASKET';
    e['CHECKOUT'] = 'CHECKOUT';
    e['COMMON'] = 'COMMON';
    e['PRODUCT'] = 'PRODUCT';
    e['FAVORITES'] = 'FAVORITES';
})(e || (e = {}));
const t = {
    ['BASKET']: '/multicart/',
    ['CHECKOUT']: '/multicart/checkout/',
    ['PRODUCT']: '/catalog/details/',
    ['FAVORITES']: '/personal/favorites/',
};
const o = {
    ['BASKET']: '.multicart-item__summary',
    ['CHECKOUT']: '.precheck-block',
    ['COMMON']: '[data-product-id]',
    ['FAVORITES']: '[data-product-id]',
    ['PRODUCT']: '.pdp-sales-block .bonus-amount',
};
const r = {
    INIT_DELAY: 2e3,
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
const n = [
    { wrapperSelector: '.pdp-sales-block', priceSelector: '[class*="__price-final"]', bonusSelector: '.bonus-amount' },
    { wrapperSelector: '.product-list-item-price__money', priceSelector: '.amount', bonusSelector: '.bonus-amount' },
    {
        wrapperSelector: '.product-offer-price',
        priceSelector: '.product-offer-price__amount',
        bonusSelector: '.bonus-amount',
    },
    {
        wrapperSelector: '.goods-item-card__money',
        priceSelector: '.goods-item-card__amount',
        bonusSelector: '.bonus-amount',
    },
    { wrapperSelector: '.item-money', priceSelector: '.item-price', bonusSelector: '.bonus-amount' },
    {
        wrapperSelector: '.multicart-item__summary',
        priceSelector: '.cart-summary-redesign__total-price-value',
        bonusSelector: '.bonus-amount',
    },
    { wrapperSelector: '.cart-item-price', priceSelector: '.price', bonusSelector: '.bonus-amount' },
    {
        wrapperSelector: '.precheck-block',
        priceSelector: '.precheck-block__total-text',
        bonusSelector: '.bonus-amount',
    },
];
const c = e => {
    const o = (0, t)[e];
    return location.pathname.startsWith(o);
};
const a = (e, t = 1e4) => {
    return new Promise((o, r) => {
        try {
            setTimeout(() => {
                o(null);
            }, t);
            let r;
            const n = () => {
                const t = document.querySelector(e);
                if (t) {
                    clearTimeout(r);
                    o(t);
                } else r = setTimeout(n, 100);
            };
            n();
        } catch (e) {
            r(e);
        }
    });
};
const s = e => {
    return (...t) => {
        e;
    };
};
const i = e => {
    return +e.replace(/[^0-9.-]+/g, '');
};
const l = e => {
    return new Promise(t => setTimeout(() => t(), e));
};
const u = (e, t = {}, o = [], r = null) => {
    const n = document.createElement(e);
    if (typeof t === 'object') for (const e in t) n.setAttribute(e, t[e]);
    if (Array.isArray(o))
        o.forEach(e => {
            n.appendChild(typeof e === 'string' ? document.createTextNode(e) : e);
        });
    if (r) r.appendChild(n);
    return n;
};
const p = (e, t) => {
    let o;
    return function (...r) {
        return new Promise(n => {
            clearTimeout(o);
            o = setTimeout(() => {
                o = null;
                Promise.resolve(e.apply(this, [...r])).then(n);
            }, t);
        });
    };
};
const d = async e => {
    await GM.setValue((0, r).CURRENT_PAGE_URL_KEY, window.location.href);
    const t = async () => {
        const t = await GM.getValue((0, r).CURRENT_PAGE_URL_KEY);
        const o = window.location.href;
        if (t !== o) {
            await GM.setValue((0, r).CURRENT_PAGE_URL_KEY, o);
            e();
        }
    };
    const o = (0, p)(t, 500);
    const n = new MutationObserver(o);
    n.observe(document.body, { childList: true, subtree: true });
};
var m = {};
m =
    '.mrp-button,.mrp-toggle{cursor:pointer;border-radius:4px;justify-content:center;align-items:center;gap:8px;padding:6px 12px;font-size:14px;transition:all .3s ease-out;display:flex}.mrp-button svg{color:var(--pui-text-tertiary);transition:color .3s ease-out}.mrp-button:hover{background-color:#8654cc1a}.mrp-button:hover svg{color:var(--pui-button-primary)}@media screen and (max-width:968px){.mrp-button .text{display:none}}.r .sort-field .field{max-width:210px}.r .filter{margin-left:auto}.mrp-real-price.mrp-real-price.mrp-real-price{letter-spacing:normal;color:#e91e63;font-family:SB Sans Display,sans-serif;font-size:max(80%,16px);line-height:1.4}.mrp-toolbar{gap:16px;margin:0 24px;display:flex}@media screen and (max-width:1200px){.mrp-toolbar{margin-top:-8px;margin-bottom:-8px}}.mrp-toggle{position:relative}.mrp-toggle input,.mrp-toggle input:active{opacity:0;border:0;outline:none;width:0;height:0;position:absolute;left:-5000px}.mrp-toggle .icon{background:#f8f8f8;border:.2em solid #ddd;border-radius:1.6em;width:5.3em;height:3.2em;padding:1em;font-size:7px;transition:all .3s ease-out;display:block;position:relative}.mrp-toggle .icon:before{content:"";text-indent:4em;z-index:2;background:#fff;border-radius:1.4em;width:2.8em;height:2.8em;transition:all .25s ease-in-out;display:block;position:absolute;top:0;left:0;right:auto;box-shadow:0 .3em .3em #0003,0 0 0 .1em #ddd}.mrp-toggle .icon:after{content:"";z-index:1;background:#f8f8f8;border-radius:1.4em;width:2.8em;height:100%;transition:all .25s ease-in-out;display:block;position:absolute;top:0;left:0}.mrp-toggle input:active+.icon:before{width:3.2em}.mrp-toggle input:checked+.icon{border-color:var(--pui-button-primary);box-shadow:inset 0 0 0 2em var(--pui-button-primary)}.mrp-toggle input:checked+.icon:after{background-color:var(--pui-button-primary);width:100%;right:1.4em}.mrp-toggle input:checked+.icon:before{left:calc(100% - 2.8em);box-shadow:0 0 0 .1em #0000,0 .3em .3em #0000004d}.mrp-toggle input:checked:active+.icon:before{left:calc(100% - 3.2em)}@media screen and (max-width:968px){.mrp-toggle .text{display:none}}';
const E = () => {
    document.head.insertAdjacentHTML('beforeend', `<style type="text/css" id="mrpStyles">${m}</style>`);
};
const S = false;
const T = (0, s)(S);
const h = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 });
const R = e => {
    const {
        wrapperEl: t,
        priceSelector: o = '.item-price',
        bonusSelector: n = '.bonus-amount',
        realPriceClassName: c,
    } = e;
    S;
    T('---- wrapperEl', t);
    const a = t.querySelector(o);
    const s = t.querySelector(n);
    const l = t.querySelector(`.${c}`);
    T('---- priceEl', o, a);
    T('---- bonusEl', n, s);
    T('---- realPriceEl', l);
    if (!a || !s) {
        T('setRealPrice cancel');
        S;
        return;
    }
    const p = (0, i)(a.firstChild.textContent.trim());
    const d = (0, i)(s.firstChild.textContent.trim());
    T('---- priceValue', p);
    T('---- bonusValue', d);
    const m = +p - +d;
    T('---- newPriceValue', m);
    const E = ` (${h.format(m)})`;
    T('---- newPriceFormatted', E);
    if (l) {
        l.textContent = E;
        T('---- realPriceEl', l);
    } else {
        const e = a.closest((0, r).PRODUCT_SELECTOR)?.id;
        const t = (0, u)('span', { class: c, 'data-parent-id': e }, [E]);
        T('---- newPriceEl', t);
        a.append(t);
    }
    T('setRealPrice end');
    S;
};
const g = async () => {
    S;
    (0, n).forEach(({ wrapperSelector: e, priceSelector: t, bonusSelector: o }) => {
        const n = document.querySelectorAll(e);
        S;
        n.forEach(e => {
            R({ wrapperEl: e, priceSelector: t, bonusSelector: o, realPriceClassName: (0, r).REAL_PRICE_CLASSNAME });
        });
    });
    S;
};
const f = async () => {
    await g();
};
class y {
    constructor({ pageType: e, pageReadyElementSelector: t, onPreparePage: o, onRun: r }) {
        this.run = async () => {
            try {
                await (0, a)(this._pageReadyElementSelector);
                await this.onPreparePage?.();
                await this.onRun();
            } catch (e) {}
        };
        this._pageType = e;
        this._pageReadyElementSelector = t;
        this.onPreparePage = o;
        this.onRun = r;
    }
}
const C = async () => {
    const e = document.querySelector((0, r).BASKET_TOTAL_PRICE_SELECTOR);
    const t = new MutationObserver(([e]) => {
        const t = e.target.textContent.trim();
        if (e.oldValue !== t) (0, f)();
    });
    t.observe(e, {
        characterData: true,
        attributes: false,
        childList: false,
        subtree: true,
        characterDataOldValue: true,
    });
};
const b = async () => {
    (0, f)();
};
const _ = new (0, y)({ pageType: (0, e).BASKET, pageReadyElementSelector: (0, o).BASKET, onPreparePage: C, onRun: b });
const O = false;
const A = (0, s)(O);
const w = e => {
    if (!e) return;
    const t = e.querySelector(`.${(0, r).REAL_PRICE_CLASSNAME}`)?.textContent;
    const o = e.querySelector((0, r).PRODUCT_PRICE_SELECTOR)?.textContent;
    const n = (0, i)(t || o);
    A('realPrice', t);
    A('price', o);
    A('resultPrice', n);
    return n;
};
const P = (e, t) => {
    A('sort a', e);
    A('sort b', t);
    if (!e.hasAttribute('data-product-id')) return 1;
    if (!t.hasAttribute('data-product-id')) return -1;
    const o = w(e);
    const r = w(t);
    return o - r;
};
const L = () => {
    const e = document.querySelector((0, r).PRODUCT_SELECTOR);
    if (!e) return;
    const t = e.parentElement;
    Array.from(t.children)
        .sort(P)
        .forEach(e => t.append(e));
};
const x = async e => {
    const t = e.target.checked;
    if (t) L();
    await GM.setValue((0, r).SORT_TOGGLE_KEY, t);
};
const v = async () => {
    const e = await GM.getValue((0, r).SORT_TOGGLE_KEY);
    if (e) L();
};
let k = '';
const M = async e => {
    const t = document.querySelector((0, r).PRODUCT_SELECTOR);
    if (!t) return;
    if (k !== t.id) {
        k = t.id;
        e();
    }
};
const U = (0, p)(M, 300);
const G = async (e, t) => {
    try {
        k = '';
        const o = new MutationObserver(async () => {
            U(t);
        });
        o.observe(e, { childList: true, subtree: true });
    } catch (e) {}
};
const I = ({ text: e, attrs: t, icon: o, onClick: r }) => {
    const n = e ? [(0, u)('span', { class: 'text' }, [e])] : [];
    const c = (0, u)('button', { class: 'mrp-button', ...t }, n);
    if (o) c.insertAdjacentHTML('afterbegin', o);
    if (r) c.addEventListener('click', r);
    return c;
};
const K =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><g clip-path="url(#a)"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h9m-9 6h7m-7 6h7m4-3 3 3m0 0 3-3m-3 3V6"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h24v24H0z"/></clipPath></defs></svg>';
const N =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12.04 10.89c-1.26-.33-1.66-.67-1.66-1.2 0-.6.56-1.02 1.5-1.02.99 0 1.35.47 1.38 1.16h1.23a2.21 2.21 0 0 0-1.78-2.11V6.5h-1.67v1.2c-1.07.24-1.94.93-1.94 2 0 1.29 1.07 1.93 2.61 2.3 1.4.33 1.67.82 1.67 1.34 0 .38-.27 1-1.5 1-1.15 0-1.6-.52-1.66-1.17H9c.07 1.21.98 1.9 2.04 2.12v1.21h1.67v-1.2c1.08-.2 1.94-.83 1.94-1.97 0-1.57-1.35-2.11-2.6-2.44Z"/><path fill="currentColor" d="M4.56 16.13a.7.7 0 0 1-.62-.4A8.78 8.78 0 0 1 5.58 5.58a8.8 8.8 0 0 1 12.44 0 .7.7 0 0 1-.99 1A7.4 7.4 0 0 0 5.19 15.1a.7.7 0 0 1-.62 1.02Zm7.24 4.46a8.77 8.77 0 0 1-6.22-2.57.7.7 0 0 1 1-1A7.4 7.4 0 0 0 18.4 8.48a.7.7 0 1 1 1.26-.63 8.8 8.8 0 0 1-7.87 12.74Z"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m9 17-2.8.5c-.05 0-.1.02-.14.05a.39.39 0 0 0-.1.12.45.45 0 0 0-.07.16.5.5 0 0 0 0 .17l.57 3.21M15.35 6.96l2.8-.5c.05 0 .1-.02.14-.05a.39.39 0 0 0 .1-.12c.03-.05.05-.1.06-.16a.5.5 0 0 0 0-.17l-.56-3.21"/></svg>';
const V = ({ text: e, attrs: t, checked: o, onChange: r }) => {
    const n = o ? { type: 'checkbox', checked: o } : { type: 'checkbox' };
    const c = (0, u)('input', n);
    const a = (0, u)('span', { class: 'icon' });
    const s = (0, u)('span', { class: 'text' }, [e]);
    const i = (0, u)('label', { class: 'mrp-toggle', ...t }, [c, a, s]);
    if (r) c.addEventListener('change', r);
    return i;
};
const D = () => {
    const e = document.querySelector((0, r).CATALOG_FILTER_SELECTOR);
    const t = (0, u)('div', { class: (0, r).MRP_TOOLBAR_CLASSNAME }, []);
    e.before(t);
};
const q = async () => {
    try {
        const e = document.querySelector(`.${(0, r).MRP_TOOLBAR_CLASSNAME}`);
        const t = await GM.getValue((0, r).SORT_TOGGLE_KEY);
        const o = (0, V)({
            checked: t,
            text: 'Автосортировка',
            attrs: { title: 'Вкл/Выкл автоматической сортировки по "красным" ценникам' },
            onChange: (0, x),
        });
        const n = (0, I)({
            text: 'Ручная сортировка',
            attrs: { title: 'Ручная сортировка по "красным" ценникам' },
            icon: (0, K),
            onClick: (0, L),
        });
        const c = (0, I)({
            text: 'Пересчет цен',
            attrs: { title: 'Ручной запуск подсчета цен с учетом бонусов' },
            icon: (0, N),
            onClick: (0, f),
        });
        e.append(o, n, c);
    } catch (e) {}
};
const F = async () => {
    await (0, f)();
    await (0, v)();
};
const B = async () => {
    const e = document.querySelector((0, r).CATALOG_WRAPPER_SELECTOR);
    const t = document.querySelector((0, r).CATALOG_FILTER_SELECTOR);
    const o = document.querySelector(`.${(0, r).MRP_TOOLBAR_CLASSNAME}`);
    if (e) (0, G)(e, F);
    if (t && !o) {
        D();
        q();
    }
};
const H = async () => {
    try {
        const e = document.querySelector((0, r).CATALOG_WRAPPER_SELECTOR);
        await (0, f)();
        if (e) await (0, v)();
    } catch (e) {}
};
const Y = new (0, y)({ pageType: (0, e).COMMON, pageReadyElementSelector: (0, o).COMMON, onPreparePage: B, onRun: H });
const j = (0, p)((0, f), 300);
const z = async () => {
    const e = document.querySelector((0, o).CHECKOUT);
    const t = new MutationObserver(j);
    t.observe(e, { childList: true, subtree: true });
};
const W = async () => {
    (0, f)();
};
const $ = new (0, y)({
    pageType: (0, e).CHECKOUT,
    pageReadyElementSelector: (0, o).CHECKOUT,
    onPreparePage: z,
    onRun: W,
});
const Z = async () => {
    const e = document.querySelector((0, r).FAVORITES_CATALOG_WRAPPER_SELECTOR);
    if (e) (0, G)(e, (0, f));
};
const J = async () => {
    (0, f)();
};
const Q = new (0, y)({
    pageType: (0, e).FAVORITES,
    pageReadyElementSelector: (0, o).FAVORITES,
    onPreparePage: Z,
    onRun: J,
});
const X = (0, p)((0, f), 300);
const ee = async () => {
    const e = document.querySelector((0, r).PRODUCT_OFFERS_SECTIONS);
    if (!e) return;
    const t = new MutationObserver(X);
    t.observe(e, { childList: true, subtree: true });
};
const et = async () => {
    (0, f)();
};
const eo = new (0, y)({
    pageType: (0, e).PRODUCT,
    pageReadyElementSelector: (0, o).PRODUCT,
    onPreparePage: ee,
    onRun: et,
});
const er = async () => {
    if ((0, c)((0, e).PRODUCT)) {
        (0, eo).run();
        return;
    }
    if ((0, c)((0, e).CHECKOUT)) {
        (0, $).run();
        return;
    }
    if ((0, c)((0, e).BASKET)) {
        (0, _).run();
        return;
    }
    if ((0, c)((0, e).FAVORITES)) {
        (0, Q).run();
        return;
    }
    (0, Y).run();
};
const en = e => {
    document.onvisibilitychange = () => {
        if (document.visibilityState === 'visible') e();
    };
};
const ec = () => {
    (0, E)();
    (0, er)();
    (0, d)((0, er));
    en((0, er));
};
try {
    window.onload = () => {
        setTimeout(ec, (0, r).INIT_DELAY);
    };
} catch (e) {}
