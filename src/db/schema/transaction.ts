import {decimal, pgEnum, pgTable, text, timestamp} from "drizzle-orm/pg-core";
import {createId} from "@paralleldrive/cuid2";

export const typeEnum = pgEnum('transaction_type', ['income', 'expense'])

export const transactions = pgTable("transactions", {
  id: text('id').$defaultFn(() => createId()).primaryKey(),
  amount: decimal("amount"),
  transactionType: typeEnum('transaction_type'),
  createdAt: timestamp("created_at").defaultNow(),
});
