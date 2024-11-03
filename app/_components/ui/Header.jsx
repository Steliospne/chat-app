'use client';
import { SwitchWrapper } from '@/app/_components/ui/SwitchWrapper';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BurgerMenu from './BurgerMenu';
import { Button } from '../shadcn/button';
import { useActionState } from 'react';
import { logout } from '@/app/actions/auth';
import { Rat } from 'lucide-react';

export default function Header({ session }) {
  const pathname = usePathname();
  const [state, action] = useActionState(logout, undefined);

  return (
    <header className='relative z-20 w-full bg-white shadow-md dark:bg-zinc-950'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center'>
          <div className='flex flex-1 items-center'>
            <Link href='/' className='flex-shrink-0'>
              <Rat />
            </Link>
            <div className='hidden md:block'>
              <div className='ml-10 flex items-baseline space-x-4'>
                <Link
                  href='/'
                  className={`rounded-md px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-200 dark:text-white dark:hover:bg-zinc-700 ${pathname === '/' ? 'bg-zinc-300 dark:bg-zinc-800' : ''}`}
                >
                  Home
                </Link>
                <Link
                  href='#'
                  className='rounded-md px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-200 dark:text-white dark:hover:bg-zinc-700'
                >
                  About
                </Link>
                {session ? (
                  <form action={action}>
                    <Button type='submit'>Logout</Button>
                  </form>
                ) : (
                  <Link
                    href='/auth/login'
                    className={`rounded-md px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-200 dark:text-white dark:hover:bg-zinc-700 ${pathname === '/auth/login' ? 'bg-zinc-300 dark:bg-zinc-800' : ''}`}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className='flex items-center'>
            <SwitchWrapper />
          </div>
          <div className='md:hidden'>
            <BurgerMenu>
              <Link href='/'>Home</Link>
              <Link href='#'>About</Link>
              {session ? (
                <form action={action}>
                  <Button type='submit'>Logout</Button>
                </form>
              ) : (
                <Link
                  href='/auth/login'
                  className={`rounded-md px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-200 dark:text-white dark:hover:bg-zinc-700 ${pathname === '/auth/login' ? 'bg-zinc-300 dark:bg-zinc-800' : ''}`}
                >
                  Login
                </Link>
              )}
            </BurgerMenu>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
    </header>
  );
}
