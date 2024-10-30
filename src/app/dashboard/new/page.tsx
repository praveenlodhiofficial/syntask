"use client"

import { CreateEventTypeAction } from '@/app/action'
import { SubmitButton } from '@/app/components/SubmitButton'
import { eventTypeSchema } from '@/app/lib/zodSchemas'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/ButtonGroup'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
// import { useForm } from '@conform-to/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useFormState } from 'react-dom'

type VideoCallPlatform = 'Zoom Meeting' | 'Google Meet' | 'Microsoft Teams'

const NewEventRoute = () => {

    const [activePlatform, setActivePlatform] = useState<VideoCallPlatform>('Google Meet')

    // conform (useForm) to cheak form details is acc. to zod schema or not
    const [lastResult, action] = useFormState(CreateEventTypeAction, undefined);
    const [form, fields] = useForm({

        lastResult,

        onValidate({ formData }) {
            return parseWithZod(formData, {
                schema: eventTypeSchema,
            });
        },

        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput'

    });

    return (
        <div className='flex flw-full items-center justify-center'>
            <Card>
                <CardHeader>
                    <CardTitle>Add new Appointment Type</CardTitle>
                    <CardDescription>Create a new appointment type that allow people to book appointments with you.</CardDescription>
                </CardHeader>

                <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
                    <CardContent className='grid gap-y-5'>

                        <div className="flex flex-col gap-y-2">
                            <Label>Title</Label>
                            <Input
                                name={fields.title.name}
                                key={fields.title.key}
                                defaultValue={fields.title.initialValue}
                                placeholder="30 min meeting"
                            />
                            <p className="text-red-500 text-sm">{fields.title.errors}</p>
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label>URL Slug</Label>
                            <div className="flex rounded-md">
                                <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground'>SynTask.com/</span>
                                <Input
                                    type="text"
                                    key={fields.url.key}
                                    defaultValue={fields.url.initialValue}
                                    name={fields.url.name}
                                    placeholder="example-user-1"
                                    className="rounded-l-none"
                                />
                            </div>
                            <p className="text-red-500 text-sm">{fields.url.errors}</p>
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label>Description</Label>
                            <Textarea
                                name={fields.description.name}
                                key={fields.description.key}
                                defaultValue={fields.description.initialValue}
                                placeholder='Meet me in this meeting to meet me!'
                            />
                            <p className="text-red-500 text-sm">{fields.description.errors}</p>
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label>Duration</Label>
                            <Select
                                name={fields.duration.name}
                                key={fields.duration.key}
                                defaultValue={fields.duration.initialValue}
                            >
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
                            <p className="text-red-500 text-sm">{fields.duration.errors}</p>
                        </div>

                        <div className="grid gap-y-2">
                            <Label>Video Call Platform</Label>
                            <input
                                type='hidden'
                                name={fields.videoCallSoftware.name}
                                value={activePlatform}
                            />
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
                            <p className="text-red-500 text-sm">{fields.videoCallSoftware.errors}</p>
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
