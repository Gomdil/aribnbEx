import { Nunito } from 'next/font/google'

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Navbar from './components/navbar/Navbar';
import ClientOnly from './components/ClientOnly';
import RegisterModal from './components/modals/RegisterModal';
import LoginModal from './components/modals/LoginModal'
import ToastProvidder from './providers/ToastProvidder';
import getCurrentUser from './action/getCurrentUser';
import RentModal from './components/modals/RentModal';
import SearchModal from './components/modals/SearchModal';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'gomdil',
  description: '곰딜입니다.',
}

const font = Nunito({
  subsets : ["latin"],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToastProvidder/>
          <SearchModal/>
          <RegisterModal/>
          <RentModal/>
          <LoginModal/>
          <Navbar currentUser={currentUser}/>
        </ClientOnly>  
        <div className='pb-20 pt-28'>
         {children}        
        </div>              
      </body>
    </html>
  )
}
