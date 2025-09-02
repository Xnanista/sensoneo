import z from "zod";
import { createSuccessResponsePaginatedSchema } from "../common/baseServerResponses.types";

export const productListItemSchema = z.object({
  id: z.number(),
  companyId: z.number(),
  registeredById: z.number(),
  name: z.string(),
  packaging: z.string(),
  deposit: z.number(),
  volume: z.number(),
  registeredAt: z.string(),
  active: z.number().min(0).max(1),
});

export type TProductListItem = z.infer<typeof productListItemSchema>;

export const getProductsListParamsSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).default(1),
  active: z.boolean().optional(),
  sort: z.enum(["name", "registeredAt"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
});

export type TGetProductsListParams = z.infer<
  typeof getProductsListParamsSchema
>;

export const getProductsListResponseSchema =
  createSuccessResponsePaginatedSchema(z.array(productListItemSchema));

export type TGetProductsListResponse = z.infer<
  typeof getProductsListResponseSchema
>;
