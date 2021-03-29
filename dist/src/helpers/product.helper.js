"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startPage = exports.PRODUCT_LIMIT = void 0;
exports.PRODUCT_LIMIT = 12;
function startPage(page = 1) {
    return (page - 1) * exports.PRODUCT_LIMIT;
}
exports.startPage = startPage;
