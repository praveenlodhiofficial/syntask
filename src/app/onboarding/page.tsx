import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

const onBoardingRoute = () => {
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

                    <form>

                        <CardContent className='flex flex-col gap-y-5'>
                            <div className="grid gap-y-2">
                                <Label>Full Name</Label>
                                <Input type='text' placeholder='Praveen Lodhi' />
                            </div>
                            <div className="grid gap-y-2">
                                <Label>Username</Label>
                                <div className="flex rounded-md">
                                    <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground'>SynTask.com/</span>
                                    <Input type='text' placeholder='example-user-01' className='rounded-l-none' />
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter>
                            <Button className='w-full'>Submit</Button>
                        </CardFooter>

                    </form>

                </Card>
            </div>
        </div>
    )
}

export default onBoardingRoute
