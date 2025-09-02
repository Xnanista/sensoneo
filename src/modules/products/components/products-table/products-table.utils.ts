import { createRouteSearchHelper } from "src/hooks/router/useValidatedSearchParams";
import { getProductsListParamsSchema } from "src/types/products/productsList.types";

export const useProductsPageSearchParams = createRouteSearchHelper(
  getProductsListParamsSchema.extend({
    page: getProductsListParamsSchema.shape.page.optional().default(1),
    limit: getProductsListParamsSchema.shape.limit.optional().default(30),
    active: getProductsListParamsSchema.shape.active.optional(),
    sort: getProductsListParamsSchema.shape.sort
      .optional()
      .default("registeredAt"),
    order: getProductsListParamsSchema.shape.order.optional().default("desc"),
  })
);
