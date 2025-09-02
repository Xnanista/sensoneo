import z from "zod";
import { createSuccessResponseSchema } from "../common/baseServerResponses.types";

export const companyListItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  registeredAt: z.string(),
});

export type TCompanyListItem = z.infer<typeof companyListItemSchema>;

export const getCompaniesListResponseSchema = createSuccessResponseSchema(
  z.array(companyListItemSchema)
);

export type TGetCompaniesListResponse = z.infer<
  typeof getCompaniesListResponseSchema
>;
