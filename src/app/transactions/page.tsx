import { db } from '@/db';
import { auth } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';
import ExpenseTable from '@/app/transactions/_components/expense-table';
import { AddTransaction } from '@/components/AddTransaction';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default async function Page() {
  const { userId } = auth();
  if (!userId) {
    return notFound();
  }

  const getTransactions = async () => {
    return db.query.transaction.findMany({
      where: (transaction, { eq }) => eq(transaction.userId, userId),
      with: { category: true },
    });
  };

  const transactionPromise = getTransactions();

  return (
    <div className="flex flex-col gap-y-2 mx-10 mt-4">
      <div className="flex justify-end">
        <AddTransaction />
      </div>
      <Suspense fallback={<Skeleton className="w-full h-[500px]" />}>
        <ExpenseTable data={transactionPromise} />
      </Suspense>
    </div>
  );
}
