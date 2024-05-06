import { ColumnDef } from '@tanstack/table-core';
import { TCategory, TSTransaction } from '@/db/schema/transaction';
import { cn } from '@/lib/utils';
import { DataTableColumnHeader } from '@/app/transactions/_components/DataTableColumnHeader';

export const columns: ColumnDef<TSTransaction & { category: TCategory }>[] = [
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Amount'} />
    ),
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Category'} />
    ),
    cell: ({ row }) => {
      const category: TCategory = row.getValue('category');
      return (
        <div className="text-left font-medium">{category.categoryName}</div>
      );
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Description'} />
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Date'} />
    ),
    cell: ({ row }) => {
      const date: Date = row.getValue('createdAt');
      return <div>{date.toDateString()}</div>;
    },
  },
  {
    accessorKey: 'transactionType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Type'} />
    ),
    cell: ({ row }) => {
      const type: string = row.getValue('transactionType');
      return (
        <div
          className={cn(
            'text-center font-medium capitalize p-2 -my-4 rounded-lg',
            {
              'bg-red-400/10 text-red-500': type === 'expense',
              'bg-emerald-400/10 text-emerald-500': type === 'income',
            },
          )}
        >
          {type}
        </div>
      );
    },
  },
];
