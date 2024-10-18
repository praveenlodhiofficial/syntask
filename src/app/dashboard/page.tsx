import React from 'react'
import { requireUser } from '../lib/hooks'; 
import prisma from '../lib/db';
import { notFound } from 'next/navigation';
import EmptyState from '../components/EmptyState';

// fetching data from the prisma database
async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      username: true,
      eventTypes: {
        select: {
          id: true,
          title: true,
          duration: true,
          description: true,
          active: true,
        },
      },
    },
  });

  if(!data) {
    return notFound();
  }

  return data;
}

const DashboardPage = async () => {

  const session = await requireUser();
  const data = await getData(session.user?.id as string);

  return (
    <>
    { data.eventTypes.length === 0 ? (
      <EmptyState
        title='You have no Event Types'
        description='Create your first Event Type to get started by clicking the button below.'
        buttonText='Add Event Type'
        href='/dashboard/new'
      />
    ) : (
      <p>we have event types</p>
    ) }
    </>
  )
}

export default DashboardPage
