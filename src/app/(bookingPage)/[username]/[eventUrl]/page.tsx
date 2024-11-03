import prisma from "@/app/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { notFound } from "next/navigation";

async function getData(eventUrl: string, userName: string) {
    const data = await prisma.eventType.findFirst({
        where: {
            url: eventUrl,
            User: {
                username: userName,
            },
            active: true,
        },
        select: {
            id: true,
            description: true,
            title: true,
            duration: true,
            videoCallSoftware: true,
            User: {
                select: {
                    image: true,
                    name: true,
                    availability: {
                        select: {
                            day: true,
                            isActive: true,
                        }
                    }
                }
            }
        },
    });

    if (!data) {
        return notFound();
    }

    return data;
}

export default async function BookingFormRoute({params}: {params: {username: string; eventUrl: string }}) {
    const data = await getData(params.eventUrl, params.username);
    return (
        <div className="justify-center flex min-h-screen w-screen items-center">
            <Card className="max-w-[1000px] w-full mx-auto">
                <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr]">
                    <div>
                        <img 
                        src={data.User?.image as string} 
                        alt="Profile Image of the USer"
                        className="size-10 rounded-full"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}