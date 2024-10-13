"use server";

import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { requireUser } from "./lib/hooks";
import { onBoardingSchemaValidation } from "./lib/zodSchemas";
import { parseWithZod } from "@conform-to/zod";

export async function onBoardingAction(prevState: any, formData: FormData) {
    const session = await requireUser();

    // Here we validated our form data with zod schema for server side validation || 
    const submission = await parseWithZod(formData, {
        schema: onBoardingSchemaValidation({
            async isUsernameUnique() {
                const existingUser = await prisma.user.findUnique({
                    where: {
                        username: formData.get('username') as string,
                    },
                });
                return !existingUser;
            },
        }),
        async: true,
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

    return redirect('/onboarding/grant-id');
}
