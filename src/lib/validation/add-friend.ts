import { z } from "zod";

export const AddFriendSchema = z.object({
	email: z
		.string()
		.min(1, { message: "Email is required" })
		.email({ message: "Invalid Email: abc@abc.ca" }),
});

export type AddFriendSchemaType = z.infer<typeof AddFriendSchema>;
