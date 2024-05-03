import { decimal, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { InferSelectModel, relations } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const typeEnum = pgEnum('transaction_type', ['income', 'expense']);

export const user = pgTable('user', {
  id: text('id').primaryKey(),
});

export const userRelations = relations(user, ({ many }) => ({
  category: many(category),
}));

export const category = pgTable('category', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  categoryName: text('category_name').unique().notNull(),
  userId: text('user_id').notNull(),
  icon: text('icon'),
});

export type TCategory = InferSelectModel<typeof category>;

export const categoryRelations = relations(category, ({ one, many }) => ({
  user: one(user, {
    fields: [category.userId],
    references: [user.id],
  }),
  transaction: many(transaction),
}));

export const transaction = pgTable('transaction', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  userId: text('user_id').notNull(),
  categoryId: text('category_id').notNull(),
  description: text('description'),
  amount: decimal('amount').notNull(),
  transactionType: typeEnum('transaction_type'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const InsertTransactionSchema = createInsertSchema(transaction);
export type TITransaction = z.infer<typeof InsertTransactionSchema>;

export const SelectTransactionSchema = createSelectSchema(transaction);
export type TSTransaction = z.infer<typeof SelectTransactionSchema>;

export const transactionRelations = relations(transaction, ({ one, many }) => ({
  user: one(user, {
    fields: [transaction.userId],
    references: [user.id],
  }),
  category: one(category, {
    fields: [transaction.categoryId],
    references: [category.id],
  }),
}));
