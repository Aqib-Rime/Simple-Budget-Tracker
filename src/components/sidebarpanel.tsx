import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ReactNode } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function SideBarPanel({
  children,
  open,
  setOpen,
  title,
  description,
}: {
  children: ReactNode;
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  description?: string;
}) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>{title}</Button>
      </SheetTrigger>
      <SheetContent
        onInteractOutside={(event) => event.preventDefault()}
        className="w-[400px] sm:w-[540px] sm:max-w-none"
      >
        <ScrollArea className="h-screen">
          <SheetHeader className="border-b-4 pb-3">
            <SheetTitle>{title}</SheetTitle>
            {description && <SheetDescription>{description}</SheetDescription>}
          </SheetHeader>
          {children}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
