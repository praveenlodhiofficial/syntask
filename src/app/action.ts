"use server";

import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { requireUser } from "./lib/hooks";
import { parseWithZod } from "@conform-to/zod";
import { aboutSettingsSchema, onBoardingSchemaValidation } from "./lib/zodSchemas";

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




// SettingsRoute Action 
export async function SettingsAction(prevState: any, formData: FormData) {
    const session = await requireUser();
  
    const submission = parseWithZod(formData, {
      schema: aboutSettingsSchema,
    });
  
    if (submission.status !== "success") {
      return submission.reply();
    }
  
    const user = await prisma.user.update({
      where: {
        id: session.user?.id as string,
      },
      data: {
        name: submission.value.fullName,
        image: submission.value.profileImage,
      },
    });
  
    return redirect("/dashboard");
  }