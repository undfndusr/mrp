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
// @homepageURL  https://github.com/undfndusr/mrp
// @downloadURL  https://github.com/undfndusr/mrp/blob/master/build/mrp.user.js
// @updateURL    https://github.com/undfndusr/mrp/blob/master/build/mrp.user.js
// @run-at       document-end
// @grant        GM.setValue
// @grant        GM.getValue
// ==/UserScript==
`.slice(1);

// https://github.com/parcel-bundler/parcel/pull/2666#issuecomment-563054225
module.exports = {
    compress: false,
    output: {
        preamble,
    },
};
