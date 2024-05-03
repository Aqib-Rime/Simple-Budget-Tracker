import { ReactNode } from 'react';
import { CircleDollarSign } from 'lucide-react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={'min-h-screen flex flex-col justify-center items-center'}>
      <div className={'flex gap-x-4 items-center mb-10'}>
        <CircleDollarSign />
        <p>Track your expenses</p>
      </div>
      {children}
    </div>
  );
}
