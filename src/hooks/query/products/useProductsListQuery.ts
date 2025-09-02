import {
  useQuery,
  type DefaultError,
  type QueryFunctionContext,
  type UseQueryOptions,
} from "@tanstack/react-query";
import userApi from "src/lib/api/userApi";
import {
  getProductsListParamsSchema,
  getProductsListResponseSchema,
} from "src/types/products/productsList.types";
import { z } from "zod";

type TQueryParams = z.infer<typeof getProductsListParamsSchema>;
type TQueryFnData = Awaited<ReturnType<typeof queryFn>>;
type TQueryKey = ReturnType<typeof queryKey>;
type TQueryError = DefaultError;
type TQO<TData = TQueryFnData> = UseQueryOptions<
  TQueryFnData,
  TQueryError,
  TData,
  TQueryKey
>;
type THookOptions<TData = TQueryFnData> = Omit<
  TQO<TData>,
  "queryKey" | "queryFn"
>;

const queryKey = (params: TQueryParams) => ["products", "list", params];

const queryFn = async (ctx: QueryFunctionContext, params: TQueryParams) => {
  const response = await userApi.request({
    method: "GET",
    url: "/api/products",
    params,
    signal: ctx.signal,
  });

  return getProductsListResponseSchema.parse(response.data);
};

const getOptions = <TData = TQueryFnData>(
  params: TQueryParams,
  options?: THookOptions<TData>
): TQO<TData> => ({
  queryKey: queryKey(params),
  queryFn: (ctx) => queryFn(ctx, params),
  ...options,
});

const useProductsListQuery = <TData = TQueryFnData>(
  params: TQueryParams,
  options?: THookOptions<TData>
) => {
  return useQuery(getOptions(params, options));
};

const ProductsListQuery = {
  useQuery: useProductsListQuery,
  getOptions,
};

export default ProductsListQuery;
