'use client';

import { DataTable } from '@/app/transactions/_components/data-table';
import { columns } from '@/app/transactions/_components/columns';
import React from 'react';

export default function ExpenseTable({ data }: { data: Promise<any[]> }) {
  const transactions = React.use(data);
  return <DataTable columns={columns} data={transactions} />;
}
