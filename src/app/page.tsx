import React from 'react'
 import { Navbar } from './components/Navbar'
import { redirect } from 'next/navigation';
import { auth } from './lib/auth';

const HomePage = async () => {
  const session = await auth();


  if(session?.user) {
    return redirect('/dashboard');
  }
  return (
    <div className='max-w-8xl px-4 mx-auto sm:px-6 lg:px-8'>
      <Navbar/>
    </div>
  )
}

export default HomePage
