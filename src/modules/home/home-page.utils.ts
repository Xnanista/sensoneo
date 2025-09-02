import { createRouteSearchHelper } from "src/hooks/router/useValidatedSearchParams";
import { getProductsListParamsSchema } from "src/types/products/productsList.types";

export const useHomePageSearchParams = createRouteSearchHelper(
  getProductsListParamsSchema.extend({
    limit: getProductsListParamsSchema.shape.limit.default(5),
    active: getProductsListParamsSchema.shape.active.default(true),
  })
);
