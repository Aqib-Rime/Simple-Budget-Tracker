'use server';

import { db } from '@/db';
import { category, TITransaction, transaction } from '@/db/schema/transaction';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function getCategories() {
  return db.select().from(category);
}

export async function addCategory(cat: string) {
  if (cat.length === 0) {
    throw new Error('Category not found');
  }
  const { userId } = auth();
  if (!userId) {
    throw new Error('User not found');
  }
  return db.insert(category).values({
    categoryName: cat,
    userId,
  });
}

export async function addTransaction(tran: TITransaction) {
  const { userId } = auth();
  if (!userId) {
    throw new Error('User not found');
  }
  await db.insert(transaction).values({
    amount: tran.amount,
    transactionType: tran.transactionType,
    userId,
    description: tran.description,
    categoryId: tran.categoryId,
  });
  revalidatePath('/transactions');
}
