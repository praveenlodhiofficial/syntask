import prisma from '@/app/lib/db'
import React from 'react'
import { notFound } from 'next/navigation'
import { requireUser } from '@/app/lib/hooks';
import { SettingsForm } from '@/app/components/SettingForm';

interface iAppProps {
    fullName: string;
    email: string;
    profileImage: string;
}

async function getData(id: string) {
    const data = await prisma.user.findUnique({
        where: {
            id: id
        },
        select: {
            name: true,
            email: true,
            image: true
        }
    });

    if (!data) {
        return notFound();
    }

    return data;
}

const SettingsRoute = async () => {
    const session = await requireUser();
    const data = await getData(session.user?.id as string);
    return (
        <SettingsForm
            email={data.email}
            fullName={data.name as string}
            profileImage={data.image as string}
        />
    )
}

export default SettingsRoute
