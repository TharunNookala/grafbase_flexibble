import { NavLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import AuthProviders from './AuthProviders'
import { getCurrentUser } from '@/lib/session'
import { signOut } from 'next-auth/react'
import ProfileMenu from './ProfileMenu'
import Button from './Button'

const Navbar = async () => {
  const session = await getCurrentUser();
  return (
    <nav className='flex items-center justify-between py-5 px-8 border-b border-[#EBEAEA] gap-4 '>
        <div className='flex flex-1 items-center justify-start gap-10'>
        <Link href='/'>
            <Image 
            src='/logo.svg' 
            width={115} 
            height={43} 
            alt='Flexxible' />
        </Link>
        <ul className='hidden xl:flex text-sm font-medium gap-7'>
            {
              NavLinks.map((link)=>(
                <Link href={link.href} key={link.key}>
                {link.text}
                </Link>
              ))
            }
        </ul>
        </div>
        <div className='flex items-center justify-center gap-4'>
            {session?.user ? (
                <>
                <ProfileMenu session={session}/>
                <Link href="/create-project">
                <Button title='Share work' />
                </Link>
                </>
              ) : (
                <AuthProviders />
              )
            }
        </div>
    </nav>
  )
}

export default Navbar