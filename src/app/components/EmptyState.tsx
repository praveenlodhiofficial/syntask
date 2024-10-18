import { Ban } from 'lucide-react'
import React from 'react'

const EmptyState = () => {
  return (
    <div className='flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50'>
      <div className="flex items-center justify-center size-20 rounded-full bg-primary/10">
        <Ban className='size-10 text-primary' />
      </div>
      <p className='text-lg font-medium'>No event types found</p>
      <p className='text-sm text-muted-foreground'>
        You don't have any event types yet.
      </p>
    </div>
  )
}

export default EmptyState
