'use client';
import Link from 'next/link';
import { Handshake, Menu } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { ModeToggle } from '@/components/ModeToogle';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { computed, useSignal } from '@preact/signals-react';

export function NavBar() {
  return (
    <header className="flex h-16 w-full items-center justify-between px-4 md:px-6 border-b-2">
      <Link className="flex items-center gap-2" href="/">
        <Handshake className="h-6 w-6" />
        <span className="text-lg font-semibold">Expense tracker</span>
      </Link>
      <nav className="hidden gap-6 text-sm font-medium md:flex md:items-center">
        <Navigations />
        <ModeToggle />
        <SignedIn>
          <UserButton afterSignOutUrl={'/sign-in'} />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </nav>
      <nav className="md:hidden">
        <SheetDemo />
      </nav>
    </header>
  );
}

function Navigations({ afterNavigate }: { afterNavigate?: () => void }) {
  const handleNavigate = () => {
    if (afterNavigate) {
      afterNavigate();
    }
  };

  return (
    <>
      <Link
        onClick={handleNavigate}
        className="hover:underline hover:underline-offset-4"
        href="/wizard"
      >
        Wizard
      </Link>
      <Link
        onClick={handleNavigate}
        className="hover:underline hover:underline-offset-4"
        href="#"
      >
        About
      </Link>
      <Link
        onClick={handleNavigate}
        className="hover:underline hover:underline-offset-4"
        href="#"
      >
        Services
      </Link>
      <Link
        onClick={handleNavigate}
        className="hover:underline hover:underline-offset-4"
        href="#"
      >
        Contact
      </Link>
    </>
  );
}

function SheetDemo() {
  const open = useSignal(false);
  return (
    <>
      {computed(() => (
        <Sheet open={open.value} onOpenChange={(value) => (open.value = value)}>
          <SheetTrigger asChild>
            <Button variant="outline">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="flex justify-between items-center mb-4 pb-4 border-b-2 mr-10">
              <Link
                onClick={() => {
                  open.value = !open.value;
                }}
                href={'/'}
                className={'flex gap-x-2 items-center '}
              >
                <Handshake className="h-6 w-6" />
                <SheetTitle>Expense Tracker</SheetTitle>
              </Link>
              <div className="flex gap-x-2 items-center">
                <ModeToggle />
                <UserButton afterSignOutUrl={'/sign-in'} />
              </div>
            </div>
            <nav className="flex-col gap-6 text-sm font-medium flex">
              <Navigations
                afterNavigate={() => {
                  open.value = !open.value;
                }}
              />
            </nav>
          </SheetContent>
        </Sheet>
      ))}
    </>
  );
}
