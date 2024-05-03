/**
 * v0 by Vercel.
 * @see https://v0.dev/t/a5VcIIkAjyj
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from 'next/link';
import { Handshake } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import { ModeToggle } from '@/components/ModeToogle';

export function NavBar() {
  return (
    <header className="flex h-16 w-full items-center justify-between px-4 md:px-6 border-b-2">
      <Link className="flex items-center gap-2" href="#">
        <Handshake className="h-6 w-6" />
        <span className="text-lg font-semibold">Expense tracker</span>
      </Link>
      <nav className="hidden gap-6 text-sm font-medium md:flex md:items-center">
        <Link
          className="hover:underline hover:underline-offset-4"
          href="/wizard"
        >
          Wizard
        </Link>
        <Link className="hover:underline hover:underline-offset-4" href="#">
          About
        </Link>
        <Link className="hover:underline hover:underline-offset-4" href="#">
          Services
        </Link>
        <Link className="hover:underline hover:underline-offset-4" href="#">
          Contact
        </Link>
        <ModeToggle />
        <UserButton afterSignOutUrl={'/sign-in'} />
      </nav>
    </header>
  );
}
