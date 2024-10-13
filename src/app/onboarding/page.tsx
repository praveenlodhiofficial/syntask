"use client";

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { useFormState } from 'react-dom'
import { useForm } from '@conform-to/react'
import { onBoardingAction } from '../action'
import { onBoardingSchema } from '../lib/zodSchemas'
import { parseWithZod } from '@conform-to/zod'
import { SubmitButton } from '../components/SubmitButton';

const onBoardingRoute = () => {

    // useFormState is used to handle the form state - React^18 
    const [lastResult, action] = useFormState(onBoardingAction, undefined);

    // Here we validated our form data with zod schema for client side validation || for server side - action.ts
    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, {
                schema: onBoardingSchema,
            });
        },

        shouldValidate: "onBlur", // onBlur is used to validate the form data when the user leaves the input field
        shouldRevalidate: "onInput", // onInput is used to validate the form data on every input change
    });

    return (
        <div>
            <div className="flex min-h-screen w-screen items-center justify-center">
                <Card className='w-full max-w-lg p-10'>
                    <CardHeader>
                        <CardTitle>
                            Welcome to Syn<span className="text-blue-400">Task</span>
                        </CardTitle>
                        <CardDescription>
                            We need following things to setup your profile
                        </CardDescription>
                    </CardHeader>

                    {/* form.id is used to identify the form, form.onSubmit is used to submit the form, action is used to handle the form submission */}
                    <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>

                        <CardContent className='flex flex-col gap-y-5'>
                            <div className="grid gap-y-2">
                                <Label>Full Name</Label>
                                <Input
                                    name={fields.fullName.name}
                                    defaultValue={fields.fullName.initialValue}
                                    key={fields.fullName.key}
                                    type='text' 
                                    placeholder='Praveen Lodhi' 
                                />
                                <p className='text-red-500 text-sm'>{fields.fullName.errors}</p>
                            </div>
                            <div className="grid gap-y-2">
                                <Label>Username</Label>
                                <div className="flex rounded-md">
                                    <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground'>SynTask.com/</span>
                                    <Input 
                                        name={fields.username.name}
                                        defaultValue={fields.username.initialValue}
                                        key={fields.username.key}
                                        type='text' 
                                        placeholder='example-user-01' 
                                        className='rounded-l-none' 
                                    />
                                </div>
                                <p className='text-red-500 text-sm'>{fields.username.errors}</p>
                            </div>
                        </CardContent>

                        <CardFooter>
                            <SubmitButton text="Submit" className='w-full' />
                        </CardFooter>

                    </form>

                </Card>
            </div>
        </div>
    )
}

export default onBoardingRoute
