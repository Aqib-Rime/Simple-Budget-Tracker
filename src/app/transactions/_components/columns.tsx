import { ColumnDef } from '@tanstack/table-core';
import { category, TCategory, TSTransaction } from '@/db/schema/transaction';
import { cn } from '@/lib/utils';

export const columns: ColumnDef<TSTransaction & { category: TCategory }>[] = [
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      const category: TCategory = row.getValue('category');
      return (
        <div className="text-left font-medium">{category.categoryName}</div>
      );
    },
  },
  { accessorKey: 'description', header: 'Description' },
  { accessorKey: 'createdAt', header: 'Date' },
  {
    accessorKey: 'transactionType',
    header: 'Type',
    cell: ({ row }) => {
      const type: string = row.getValue('transactionType');
      return (
        <div
          className={cn('text-center font-medium capitalize p-2 rounded-lg', {
            'bg-red-400/10 text-red-500': type === 'expense',
            'bg-emerald-400/10 text-emerald-500': type === 'income',
          })}
        >
          {type}
        </div>
      );
    },
  },
];
