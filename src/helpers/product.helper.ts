

export const PRODUCT_LIMIT: number = 12;

export function startPage(page = 1): number {
    return (page - 1) * PRODUCT_LIMIT;
}