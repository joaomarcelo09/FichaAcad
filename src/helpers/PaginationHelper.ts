export const paginationHelper = (page: any, limit: any, count: any) => ({
    page: page ? Number(page) : 1,
    lastPage: limit ? Math.ceil(count / limit) : 1,
    totalQuantity: count,
});