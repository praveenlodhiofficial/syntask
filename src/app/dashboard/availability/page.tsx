import prisma from '@/app/lib/db'
import { requireUser } from '@/app/lib/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectItem, SelectContent, SelectValue, SelectTrigger, SelectGroup } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import React from 'react'

async function getData(userId: string) {
  const data = await prisma.availability.findMany({
    where: {
      userId: userId,
    }
  })

  return data
}

const AvailabilityRoute =async () => {

  const session = await requireUser()
  const data = await getData(session.user?.id as string)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability</CardTitle>
        <CardDescription>
          Manage your availability for appointments.
        </CardDescription>
      </CardHeader>



    </Card>
  )
}

export default AvailabilityRoute
