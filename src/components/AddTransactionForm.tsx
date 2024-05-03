'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ReactNode, useEffect } from 'react';
import { toast } from 'sonner';

import { InsertTransactionSchema, TCategory } from '@/db/schema/transaction';
import { useAuth } from '@clerk/nextjs';
import { notFound } from 'next/navigation';
import { addTransaction, getCategories } from '@/actions';
import { Loader2 } from 'lucide-react';
import { queryClient } from '@/provider/tanstack-provider/TanStackProvider';
import { computed, useSignal } from '@preact/signals-react';
import { SingleSelect } from '@/components/SingleSelect';

const isRequired = (name: keyof z.infer<typeof InsertTransactionSchema>) =>
  !InsertTransactionSchema._def.shape()[name]?.isOptional();

type TransactionFormProps = {
  closeSheet?: () => void;
};

export function TransactionForm({ closeSheet }: TransactionFormProps) {
  const { userId } = useAuth();
  if (!userId) {
    return notFound();
  }
  const form = useForm<z.infer<typeof InsertTransactionSchema>>({
    resolver: zodResolver(InsertTransactionSchema),
    defaultValues: {
      amount: '0.0',
      transactionType: 'income',
      userId,
    },
  });

  const categories = useSignal<TCategory[]>([]);

  const getClientCategories = async () => {
    return await queryClient.fetchQuery({
      queryFn: async () => {
        return getCategories();
      },
      queryKey: ['categories'],
    });
  };

  useEffect(() => {
    getClientCategories().then((value) => (categories.value = value));
  }, []);

  async function onSubmit(values: z.infer<typeof InsertTransactionSchema>) {
    await addTransaction(values);

    toast('Transaction added successfully');

    closeSheet && closeSheet();
  }

  function getLabel(
    fieldName: keyof z.infer<typeof InsertTransactionSchema>,
    displayName?: string,
  ) {
    return (
      <FormLabel>
        <p className="capitalize mb-2">
          {displayName ?? fieldName}
          {isRequired(fieldName) && (
            <span className="text-red-500">{' *'}</span>
          )}
        </p>
      </FormLabel>
    );
  }

  return (
    <Form {...form}>
      <fieldset disabled={form.formState.isSubmitting} className={'mt-5 px-1'}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormFieldDecoration>
                <div>
                  {getLabel('categoryId', 'Category')}
                  <FormControl>
                    {computed(() => (
                      <SingleSelect
                        placeholder="Select a category"
                        items={categories.value.map((cat) => ({
                          label: cat.categoryName,
                          value: cat.id,
                        }))}
                        onSelect={field.onChange}
                      />
                    ))}
                  </FormControl>
                </div>
              </FormFieldDecoration>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormFieldDecoration>
                <div>
                  {getLabel('description')}
                  <FormControl>
                    <Input
                      placeholder="Transaction description"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                </div>
              </FormFieldDecoration>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormFieldDecoration>
                <div>
                  {getLabel('amount')}
                  <FormControl>
                    <Input type="number" placeholder="Amount" {...field} />
                  </FormControl>
                </div>
              </FormFieldDecoration>
            )}
          />
          <FormField
            control={form.control}
            name="transactionType"
            render={({ field }) => (
              <FormFieldDecoration>
                <div>
                  {getLabel('transactionType', 'Transaction Type')}
                  <FormControl>
                    {computed(() => (
                      <SingleSelect
                        placeholder="Select a transaction type"
                        items={[
                          { label: 'Expense', value: 'expense' },
                          { label: 'Income', value: 'income' },
                        ]}
                        onSelect={field.onChange}
                      />
                    ))}
                  </FormControl>
                </div>
              </FormFieldDecoration>
            )}
          />

          <div className={'flex justify-end pt-5'}>
            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="flex space-x-2"
            >
              {form.formState.isSubmitting && (
                <Loader2 className="animate-spin" />
              )}
              <p>Add Transaction</p>
            </Button>
          </div>
        </form>
      </fieldset>
    </Form>
  );
}

function FieldAnimation({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 100 }}
      transition={{ type: 'spring', delay: 0.2 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

function FormFieldDecoration({ children }: { children: ReactNode }) {
  return (
    <FieldAnimation>
      <FormItem>
        {children}
        <FormMessage />
      </FormItem>
    </FieldAnimation>
  );
}
