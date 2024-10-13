"use server";

import prisma from "./lib/db";
import { requireUser } from "./lib/hooks";

export async function onBoardingAction(formData: FormData) {

    const session = await requireUser();

    const data = await prisma.user.update({
        where: {
            id: session.user?.id,
        },
        data: {
            username: "tfghjbk",
            name: "gfhcvjbkn",
        },
    });

    formData
}
