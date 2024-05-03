import { Button } from '@/components/ui/button';
import { db } from '@/db';
import { transactions } from '@/db/schema/transaction';
import { revalidatePath } from 'next/cache';
import { eq, sum } from 'drizzle-orm';

export default async function Home() {
  const transactions_see = await db.select().from(transactions);
  const totalAmount = await db
    .select({
      totalAmount: sum(transactions.amount),
    })
    .from(transactions);
  // const sumTest = totalAmount.reduce((acc, curr) => acc + (Number(curr.totalAmount ?? '0')), 0);
  return (
    <main className="m-10">
      NextJs starter template {transactions_see.length}
      <div className={'flex flex-col gap-y-2 mb-4'}>
        {transactions_see.map((transaction) => {
          return (
            <div className={'flex gap-x-2 items-center'} key={transaction.id}>
              <p>{transaction.transactionType}</p>
              <p>{transaction.amount}</p>
              <p>{transaction.id}</p>
              <p>{transaction.createdAt?.toISOString()}</p>
              <form
                action={async () => {
                  'use server';
                  await db
                    .delete(transactions)
                    .where(eq(transactions.id, transaction.id));
                  revalidatePath('/');
                }}
              >
                <Button type={'submit'} variant={'destructive'} size="sm">
                  Delete
                </Button>
              </form>
            </div>
          );
        })}
      </div>
      <form
        action={async () => {
          'use server';
          await db.insert(transactions).values({
            transactionType: 'expense',
            amount: '100.3',
          });
          revalidatePath('/');
        }}
      >
        <Button type="submit">Add New Transaction</Button>
      </form>
      <Button variant="secondary">
        Total amount : {totalAmount[0].totalAmount ?? 0}
      </Button>
      <pre>{JSON.stringify(totalAmount, null, 2)}</pre>
    </main>
  );
}
