import z from "zod";
import { createSuccessResponseSchema } from "../common/baseServerResponses.types";

export const userListItemSchema = z.object({
  id: z.number(),
  companyId: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  createdAt: z.string(),
});

export type TUserListItem = z.infer<typeof userListItemSchema>;

export const getUsersListResponseSchema = createSuccessResponseSchema(
  z.array(userListItemSchema)
);

export type TGetUsersListResponse = z.infer<typeof getUsersListResponseSchema>;
