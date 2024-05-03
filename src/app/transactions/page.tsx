import { db } from '@/db';
import { auth } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';
import ExpenseTable from '@/app/transactions/_components/expense-table';
import { AddTransaction } from '@/components/AddTransaction';

export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default async function Page() {
  await wait(2000);
  const { userId } = auth();
  if (!userId) {
    return notFound();
  }
  console.log(userId);
  const trans = await db.query.transaction.findMany({
    where: (transaction, { eq }) => eq(transaction.userId, userId),
    with: { category: true },
  });

  return (
    <div className="flex flex-col gap-y-2 mx-10 mt-4">
      <div className="flex justify-end">
        <AddTransaction />
      </div>
      <ExpenseTable data={trans} />
    </div>
  );
}
