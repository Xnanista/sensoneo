import queryString from "query-string";
import React from "react";
import { useSearchParams } from "react-router";
import type z from "zod";

type TUpdater<T> = React.SetStateAction<T>;

/**
 * A custom React hook that validates URL search parameters against a Zod schema.
 *
 */
const useValidatedSearchParams = <TSchema extends z.ZodObject>(
  schema: TSchema
): [z.infer<TSchema>, (updater: TUpdater<z.infer<TSchema>>) => void] => {
  const [searchParams, setSearchParams] = useSearchParams();

  const validatedSearchParams = React.useMemo(() => {
    const dirtyValues = queryString.parse(searchParams.toString(), {
      parseBooleans: true,
      parseNumbers: true,
    });
    return schema.parse(dirtyValues);
  }, [searchParams]);

  const setValidatedParams = React.useCallback<
    (updater: TUpdater<z.infer<TSchema>>) => void
  >(
    (updater) => {
      const nextParams = {
        ...structuredClone(validatedSearchParams),
        ...(typeof updater === "function"
          ? updater(validatedSearchParams)
          : updater),
      };
      setSearchParams(queryString.stringify(nextParams));
    },
    [setSearchParams, schema, validatedSearchParams]
  );

  return [validatedSearchParams, setValidatedParams] as const;
};

/**
 * Creates a custom hook factory for validating URL search parameters against a Zod schema.
 */
const createRouteSearchHelper =
  <TSchema extends z.ZodObject>(schema: TSchema) =>
  () =>
    useValidatedSearchParams(schema);

export { createRouteSearchHelper, useValidatedSearchParams };
