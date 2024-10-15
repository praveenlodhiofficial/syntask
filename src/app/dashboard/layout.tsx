import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from "@/public/logo.png";
import { DashboardLinks } from '../components/DashboardLinks';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { requireUser } from '../lib/hooks';
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import { signOut } from '../lib/auth';
import { redirect } from 'next/navigation';
import prisma from '../lib/db';
import { Toaster } from '@/components/ui/sonner';

async function getData(userId: string) {
    const data = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            username: true,
            grantId: true,
        },
    });

    if (!data?.username) {
        return redirect("/onboarding");
    }

    if (!data?.grantId) {
        return redirect("/onboarding/grant-id");
    }

    return data;
}

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {

    const session = await requireUser();
    const data = await getData(session.user?.id as string);
    return (
        <>
            <div>

                {/* Dashboard Layout */}
                <div className="min-h-screen w-full grid md:grid-cols-[220px_1fr]">

                    {/* Sidebar for desktop */}
                    <div className="hidden md:block border-r bg-muted">
                        <div className="flex h-full max-h-screen flex-col gap-2">
                            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                                <Link href="/" className='flex items-center gap-2'>
                                    <Image src={Logo} alt="Logo" className='size-8' />
                                    <p className='text-xl font-bold'>
                                        Syn<span className="text-primary">Task</span>
                                    </p>
                                </Link>
                            </div>

                            {/* Dashboard Links */}
                            <div className="flex-1">
                                <nav className="grid items-center px-2 lg:px-4">
                                    <DashboardLinks />
                                </nav>
                            </div>

                        </div>
                    </div>

                    {/* Sidebar for mobile */}
                    <div className="flex flex-col">
                        <header className='flex h-14 items-center gap-4 bg-muted/40 border-b px-4 lg:h-[60px] lg:px-6'>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className='md:hidden shrink-0'>
                                        <Menu className='size-5' />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className='flex flex-col'>
                                    <nav className='grid gap-2 mt-7'>
                                        <DashboardLinks />
                                    </nav>
                                </SheetContent>
                            </Sheet>

                            {/* Theme Toggle - Dark Mode, Light Mode, System Mode*/}
                            <div className="ml-auto flex items-center gap-x-4">
                                <ThemeToggle />

                                <DropdownMenu>

                                    {/* Profile Image */}
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="secondary" size="icon" className="rounded-full">
                                            <img src={session?.user?.image as string} alt="Profile Imange" width={20} height={20} className='w-full h-full rounded-full' />
                                            {/* <span className="sr-only">Toggle user menu</span> */}
                                        </Button>
                                    </DropdownMenuTrigger>

                                    {/* My Account Dropdown Menu */}
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Link href="/dashboard/settings">Settings</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <form
                                                className="w-full"
                                                action={async () => {
                                                    "use server";
                                                    await signOut();
                                                }}
                                            >
                                                <button className="w-full text-left">Log out</button>
                                            </form>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>

                                </DropdownMenu>

                            </div>
                        </header>

                        {/* Children Pages rendered here */}
                        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                            {children}
                        </main>

                    </div>
                </div>
            </div>

            <Toaster richColors closeButton />
        </>
    )
}

export default DashboardLayout
