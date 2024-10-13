"use server";

import prisma from "./lib/db";
import { requireUser } from "./lib/hooks";
import { onBoardingSchema } from "./lib/zodSchemas";
import { parseWithZod } from "@conform-to/zod";

export async function onBoardingAction(prevState: any, formData: FormData) {
    const session = await requireUser();

    // Here we validated our form data with zod schema for server side validation || 
    const submission = parseWithZod(formData, {
        schema: onBoardingSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const data = await prisma.user.update({
        where: {
            id: session.user?.id,
        },
        data: {
            username: submission.value.username,
            name: submission.value.fullName,
        },
    });
}
