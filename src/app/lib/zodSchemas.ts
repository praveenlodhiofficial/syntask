import { z } from "zod";

export const onBoardingSchema = z.object({
    fullName: z.string().min(3).max(150),
    username: z.string().min(3).max(150).regex(/^[a-zA-Z0-9_]+$/, {
        message: "username can only contain letters, numbers and underscores",
    }),
})
