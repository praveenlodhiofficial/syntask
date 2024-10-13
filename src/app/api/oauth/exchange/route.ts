import prisma from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";
import nylas, { nylasConfig } from "@/app/lib/nylas";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const session = await requireUser();

    const url = new URL(request.url);
    const code = url.searchParams.get("code");

    if (!code) {
        return Response.json("No code provided" , { 
            status: 400 
        });
    }

    try {
        const response = await nylas.auth.exchangeCodeForToken({
            clientId: nylasConfig.clientId,
            clientSecret: nylasConfig.apiKey,
            redirectUri: nylasConfig.redirectUri,
            code: code,
        });

        const { grantId, email } = response;

        if (!session.user) {
            throw new Error("User not found in session");
        }

        await prisma.user.update({
            where: { 
                id: session.user.id 
            },
            data: { 
                grantId, 
                grantEmail: email 
            },
        });

        // return Response.json("Successfully connected to Grand", {
        //     status: 200
        // });

    } catch (error) {
        console.log("Error something went wrong", error);
    }

    redirect("/dashboard");
}
