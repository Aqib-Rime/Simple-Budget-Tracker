import { db } from '@/db';
import { auth } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';
import ExpenseTable from '@/app/transactions/_components/expense-table';

function wait(ms: number): Promise<void> {
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

  console.log(trans);

  return (
    <div>
      <ExpenseTable data={trans} />
    </div>
  );
}
