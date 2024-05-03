'use client';

import { DataTable } from '@/app/transactions/_components/data-table';
import { columns } from '@/app/transactions/_components/columns';

export default function ExpenseTable({ data }: { data: any[] }) {
  return <DataTable columns={columns} data={data} />;
}
