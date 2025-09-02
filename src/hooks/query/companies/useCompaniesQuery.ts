import {
  useQuery,
  type DefaultError,
  type QueryFunctionContext,
  type UseQueryOptions,
} from "@tanstack/react-query";
import userApi from "src/lib/api/userApi";
import { getCompaniesListResponseSchema } from "src/types/companies/companiesList.types";

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

const queryKey = () => ["companies", "list"];

const queryFn = async (ctx: QueryFunctionContext) => {
  const response = await userApi.request({
    method: "GET",
    url: "/api/companies",
    signal: ctx.signal,
  });

  return getCompaniesListResponseSchema.parse(response.data);
};

const getOptions = <TData = TQueryFnData>(
  options?: THookOptions<TData>
): TQO<TData> => ({
  queryKey: queryKey(),
  queryFn,
  ...options,
});

const useCompaniesQuery = <TData = TQueryFnData>(
  options?: THookOptions<TData>
) => {
  return useQuery(getOptions(options));
};

const CompaniesQuery = {
  useQuery: useCompaniesQuery,
  getOptions,
};

export default CompaniesQuery;
