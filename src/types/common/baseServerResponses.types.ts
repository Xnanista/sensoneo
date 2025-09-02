import z from "zod";

export const paginationSchema = z.object({
  currentPage: z.number(),
  totalPages: z.number(),
  totalItems: z.number(),
  itemsPerPage: z.number(),
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
});

export type TPagination = z.infer<typeof paginationSchema>;

export const baseServerResponseSchema = z.object({
  success: z.boolean(),
});

export const createSuccessResponseSchema = <T extends z.ZodTypeAny>(
  data: T
) => {
  return baseServerResponseSchema.extend({
    data,
    total: z.number().min(0),
  });
};

export const createSuccessResponsePaginatedSchema = <T extends z.ZodTypeAny>(
  data: T
) => {
  return baseServerResponseSchema.extend({
    pagination: paginationSchema,
    data,
  });
};

export const errorSchema = z.object({
  success: z.literal(false),
  error: z.string(),
});

export type TApiError = z.infer<typeof errorSchema>;
