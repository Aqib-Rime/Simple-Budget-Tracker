'use server';

import { db } from '@/db';
import { category } from '@/db/schema/transaction';
import { auth } from '@clerk/nextjs/server';

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
