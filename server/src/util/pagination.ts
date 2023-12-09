import { Request } from 'express';

interface Pagination {
    currentItems: number;
    numberOfPages: number;
    currentPage: number;
    firstPageItem: number;
    lastPageItem: number;
    previousPageItem: number;
    nextPageItem: number;
    getFirstQueryString: string;
    getLastQueryString: string;
    getPreviousQueryString: string;
    getNextString: string;
    itemToPageNumber: (itemNumber: number) => number;
}

function currentItems(total: number, start: number, limit: number): number {
    return start && limit ? Math.min(limit, total - start + 1) : total;
}

function numberOfPages(total: number, start: number, limit: number): number {
    return start && limit ? Math.ceil((total - start + 1) / limit) : 1;
}

function currentPage(total: number, start: number, limit: number): number {
    return start && limit ? Math.ceil(start / limit) : 1;
}

function firstPageItem(total: number, start: number, limit: number): number {
    return 1;
}

function lastPageItem(total: number, start: number, limit: number): number {
    return start && limit ? start + limit - 1 : total;
}

function previousPageItem(total: number, start: number, limit: number): number {
    return Math.max(1, start - limit);
}

function nextPageItem(total: number, start: number, limit: number): number {
    return Math.min(total, start + limit);
}

function getFirstQueryString(total: number, start: number, limit: number): string {
    return start && limit ? `?start=1&limit=${limit}` : '';
}

function getLastQueryString(total: number, start: number, limit: number): string {
    return start && limit ? `?start=${total - limit + 1}&limit=${limit}` : '';
}

function getPreviousQueryString(total: number, start: number, limit: number): string {
    return start && limit
        ? `?start=${previousPageItem(total, start, limit)}&limit=${limit}`
        : '';
}

function getNextString(total: number, start: number, limit: number): string {
    return start && limit
        ? `?start=${nextPageItem(total, start, limit)}&limit=${limit}`
        : '';
}

function itemToPageNumber(total: number, start: number, limit: number, itemNumber: number): number {
    return start && limit ? Math.ceil(itemNumber / limit) : 1;
}

/**
 * Creates a pagination object based on the total number of items, start index, and limit.
 * @param total - The total number of items.
 * @param start - The start index of the current page.
 * @param limit - The maximum number of items per page.
 * @returns A Pagination object containing information about the current page, number of pages, and more.
 */
function createPagination(total: number, start: number, limit: number): Pagination {
    limit = limit || 10;
    return {
        currentItems: currentItems(total, start, limit),
        numberOfPages: numberOfPages(total, start, limit),
        currentPage: currentPage(total, start, limit),
        firstPageItem: firstPageItem(total, start, limit),
        lastPageItem: lastPageItem(total, start, limit),
        previousPageItem: previousPageItem(total, start, limit),
        nextPageItem: nextPageItem(total, start, limit),
        getFirstQueryString: getFirstQueryString(total, start, limit),
        getLastQueryString: getLastQueryString(total, start, limit),
        getPreviousQueryString: getPreviousQueryString(total, start, limit),
        getNextString: getNextString(total, start, limit),
        itemToPageNumber: (itemNumber: number) => itemToPageNumber(total, start, limit, itemNumber),
    };
}

export default createPagination;
