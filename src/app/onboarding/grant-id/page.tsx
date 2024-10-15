import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'
import VideoGif from '@/public/work-is-almost-over-happy.gif'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CalendarCheck2 } from 'lucide-react'

const onBoardingRoute2UsingNylas = () => {
    return (
        <div className="min-h-screen flex w-screen justify-center items-center">
            <Card>
                <CardHeader>
                    <CardTitle>You are almost done !!!</CardTitle>
                    <CardDescription>
                        We have to now connect your SynTask to your Nylas account.
                    </CardDescription>
                    <Image src={VideoGif} alt="Almost finished gif" className='w-full rounded-lg' />
                </CardHeader>
                <CardContent>
                    <Button asChild className='w-full'>
                        <Link href="/api/auth">
                            <CalendarCheck2 className='size-4 mr-2' />
                            Connect Nylas Account to 
                            Syn<span className="text-blue-400">Task</span>
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default onBoardingRoute2UsingNylas
