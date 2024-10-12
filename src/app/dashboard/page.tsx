import React from 'react'
import { auth } from '../libs/auth';
import { redirect } from 'next/navigation';
import { requireUser } from '../libs/hooks';

const DashboardPage = async() => {

  const session = await requireUser();

  return (
    <div>
      Dashboard
    </div>
  )
}

export default DashboardPage
