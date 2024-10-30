"use client"

import { SubmitButton } from '@/app/components/SubmitButton'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/ButtonGroup'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import React, { useState } from 'react'

type VideoCallPlatform = 'Zoom Meeting' | 'Google Meet' | 'Microsoft Teams'

const NewEventRoute = () => {

    const [activePlatform, setActivePlatform] = useState<VideoCallPlatform>('Google Meet')

    return (
        <div className='flex flw-full items-center justify-center'>
            <Card>
                <CardHeader>
                    <CardTitle>Add new Appointment Type</CardTitle>
                    <CardDescription>Create a new appointment type that allow people to book appointments with you.</CardDescription>
                </CardHeader>

                <form action="">
                    <CardContent className='grid gap-y-5'>

                        <div className="flex flex-col gap-y-2">
                            <Label>Title</Label>
                            <Input placeholder='30 minute meeting' />
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label>URL Slug</Label>
                            <div className="flex rounded-md">
                                <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground'>SynTask.com/</span>
                                <Input placeholder='Example-url-01' className='rounded-l-none' />
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label>Description</Label>
                            <Textarea placeholder='Meet me in this meeting to meet me!' />
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label>Duration</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder='Select a duration' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Duration</SelectLabel>
                                        <SelectItem value='15'>15 minutes</SelectItem>
                                        <SelectItem value='30'>30 minutes</SelectItem>
                                        <SelectItem value='45'>45 minutes</SelectItem>
                                        <SelectItem value='60'>60 minutes</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-y-2">
                            <Label>Video Call Platform</Label>
                            <ButtonGroup>

                               <Button 
                               type='button'
                                className='w-full rounded-r-none' 
                                onClick={() => setActivePlatform('Microsoft Teams')}
                                variant={activePlatform === 'Microsoft Teams' ? 'secondary' : 'outline'}
                                >Microsoft Teams
                                </Button>

                                <Button 
                                type='button'
                                className='w-full rounded-r-none rounded-l-none' 
                                onClick={() => setActivePlatform('Google Meet')}
                                variant={activePlatform === 'Google Meet' ? 'secondary' : 'outline'}
                                >Google Meet
                                </Button>

                                <Button 
                                type='button'
                                className='w-full rounded-l-none' 
                                onClick={() => setActivePlatform('Zoom Meeting')}
                                variant={activePlatform === 'Zoom Meeting' ? 'secondary' : 'outline'}
                                >Zoom Meeting
                                </Button>

                            </ButtonGroup>
                        </div>

                    </CardContent>

                    <CardFooter className='w-full flex justify-between items-center '>
                        <Button variant='secondary' asChild>
                            <Link href='/dashboard'>Cancel</Link>
                        </Button>

                        <SubmitButton text='Create Event' />
                    </CardFooter>

                </form>

            </Card>
        </div>
    )
}

export default NewEventRoute
