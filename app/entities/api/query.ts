import { queryOptions } from "@tanstack/react-query";

import { getTables } from "./api";

export const keys = {
  tables: () => ["tables"] as const,
};

export const queries = {
  tables: () =>
    queryOptions({
      queryKey: keys.tables(),
      queryFn: () => getTables(),
    }),
};
