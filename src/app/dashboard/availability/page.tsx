import { updateAvailabilityAction } from '@/app/action'
import { SubmitButton } from '@/app/components/SubmitButton'
import prisma from '@/app/lib/db'
import { requireUser } from '@/app/lib/hooks'
import { times } from '@/app/lib/times'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectItem, SelectContent, SelectValue, SelectTrigger, SelectGroup } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import React from 'react'

// Function to get availability from database
async function getData(userId: string) {
  const data = await prisma.availability.findMany({
    where: {
      userId: userId,
    }
  })

  return data
}

const AvailabilityRoute =async () => {

  // Get user session
  const session = await requireUser()

  // Get availability from database
  const data = await getData(session.user?.id as string)

  return (

    // Card to display availability
    <Card>
      <CardHeader>
        <CardTitle>Availability</CardTitle>
        <CardDescription>
          In this section you can manage your availability.
        </CardDescription>
      </CardHeader>

      {/* Form to update availability */}
      <form action={updateAvailabilityAction}>
        <CardContent className="flex flex-col gap-y-4">
          {data.map((item) => (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-4"
              key={item.id}
            >
              <input type="hidden" name={`id-${item.id}`} value={item.id} />
              <div className="flex items-center gap-x-3">
                <Switch
                  name={`isActive-${item.id}`}
                  defaultChecked={item.isActive}
                />
                <p>{item.day}</p>
              </div>

              {/* From Time */}
              <Select name={`fromTime-${item.id}`} defaultValue={item.fromTime}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="From Time" />
                </SelectTrigger>
                <SelectContent>

                  {/* Mapping from time from Times Array */}
                  <SelectGroup>
                    {times.map((time) => (
                      <SelectItem key={time.id} value={time.time}>
                        {time.time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* Till Time */}
              <Select name={`tillTime-${item.id}`} defaultValue={item.tillTime}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="To Time" />
                </SelectTrigger>
                <SelectContent>

                  {/* Mapping till time from Times Array */}
                  <SelectGroup>
                    {times.map((time) => (
                      <SelectItem key={time.id} value={time.time}>
                        {time.time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ))}
        </CardContent>

        {/* Submit Button to save changes */}
        <CardFooter>
          <SubmitButton text="Save Changes" />
        </CardFooter>
      </form>
    </Card>
  );  
}

export default AvailabilityRoute
