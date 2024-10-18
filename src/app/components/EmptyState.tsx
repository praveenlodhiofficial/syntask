import { Button } from '@/components/ui/button';
import { Ban, PlusCircle } from 'lucide-react'
import Link from 'next/link';
import React from 'react'

interface iAppProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

const EmptyState = ({ title, description, buttonText, href }: iAppProps) => {
  return (
    <div className='flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50'>
      
      {/* Ban Icon */}
      <div className="flex items-center justify-center size-20 rounded-full bg-primary/10">
        <Ban className='size-10 text-primary' />
      </div>
      {/* <p className='text-lg font-medium'>No event types found</p> */}
      {/* <p className='text-sm text-muted-foreground'>You don't have any event types yet.</p> */}

      {/* Title */}
      <h2 className='text-lg font-xl'>{title}</h2>
      <p className='text-sm text-muted-foreground mb-8 mt-2 max-w-sm mx-auto'>{description}</p>
      <Button asChild>
        <Link href={href}>
        <PlusCircle className='size-4 mr-1' />
        {buttonText}
        </Link>
      </Button>

    </div>
  )
}

export default EmptyState
