const pkg = require('./package.json');

const preamble = `
// ==UserScript==
// @name         Megamarket Real Price
// @description  Выводит цены с учетом бонусов и добавляет сортировку по ним
// @version      ${pkg.version}
// @author       ${pkg.author}
// @license      MIT
// @match        *://*.megamarket.ru/*
// @namespace    http://tampermonkey.net/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=megamarket.ru
// @homepageURL  https://greasyfork.org/ru/scripts/474940-megamarket-real-price
// @run-at       document-idle
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==
`;

// https://github.com/parcel-bundler/parcel/pull/2666#issuecomment-563054225
module.exports = {
    output: {
        preamble,
    },
};
