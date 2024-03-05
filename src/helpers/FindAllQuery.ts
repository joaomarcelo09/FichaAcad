import { IPagination } from "src/types";

export const formatFindAllQuery = ({
  limit,
  page,
  where,
  orderBy,
  select,
  include,
}): any => {
  const options: IPagination = {}
  if (+limit) {
    options.limit = +limit;
  }
  if (+page) {
    options.page = +page;
  }
  if (where) {
    options.where = JSON.parse(where);
  }
  if (select) {
    options.select = JSON.parse(select);
  }
  if (orderBy) {
    options.orderBy = JSON.parse(orderBy);
  }
  if (include) {
    options.include = JSON.parse(include);
  }
  return options
}