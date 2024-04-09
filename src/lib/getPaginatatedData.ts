import { get_env } from './get-env';

export async function getPaginatedData({ model, query, paginationQuery }: { query: any; model: any; paginationQuery: { currentPage?: number } }) {
  let skip = 0;
  const currentPage = paginationQuery.currentPage === 1 || !paginationQuery.currentPage ? 0 : paginationQuery.currentPage - 1;

  if (paginationQuery.currentPage) {
    skip = get_env.ROW_LIMIT_PER_PAGE * currentPage;
  }

  const row_counts = await model.find(query).countDocuments();
  const list = await model.find(query).limit(get_env.ROW_LIMIT_PER_PAGE).skip(skip);
  const pagination = {
    totalPage: Math.ceil(row_counts / get_env.ROW_LIMIT_PER_PAGE),
    currentPage: currentPage === 0 ? 1 : currentPage,
  };

  return {
    list,
    pagination,
  };
}
