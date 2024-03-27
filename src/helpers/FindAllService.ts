export const formatOptFindAll = ({
    page,
    limit,
    where,
    orderBy,
    select,
    include,
  }: {
    page?: any,
    limit?: any,
    where?: any,
    orderBy?: any,
    select?: any,
    include?: any,
  }) => {
    const options: any = { }
        if ((page || page === 0) && limit) {
            options.skip = (page - 1) * limit;
          }
          if (limit) {
            options.take = parseInt(limit);
          }
          if (where) {
            options.where = where;
          }
          if (orderBy) {
            options.orderBy = orderBy;
          }
          if (select) {
            options.select = select;
          }
          if (include) {
            options.include = include;
          }
    return options
}