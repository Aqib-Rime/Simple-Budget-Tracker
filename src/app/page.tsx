import { Button } from '@/components/ui/button';
import { db } from '@/db';
import { transaction } from '@/db/schema/transaction';
import { revalidatePath } from 'next/cache';
import { eq, sum } from 'drizzle-orm';

export default async function Home() {
  const transactions = await db.select().from(transaction);
  const totalAmount = await db
    .select({
      totalAmount: sum(transaction.amount),
    })
    .from(transaction);
  return (
    <main className="m-10">
      NextJs starter template {transactions.length}
      <div className={'flex flex-col gap-y-2 mb-4'}>
        {transactions.map((tran) => {
          return (
            <div className={'flex gap-x-2 items-center'} key={tran.id}>
              <p>{tran.transactionType}</p>
              <p>{tran.amount}</p>
              <p>{tran.id}</p>
              <p>{tran.createdAt?.toISOString()}</p>
              <form
                action={async () => {
                  'use server';
                  await db
                    .delete(transaction)
                    .where(eq(transaction.id, tran.id));
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
          // await db.insert(transaction).values({
          //   transactionType: 'expense',
          //   amount: '100.3',
          // });
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
