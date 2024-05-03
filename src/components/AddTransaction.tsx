'use client';

import { useState } from 'react';
import SideBarPanel from '@/components/sidebarpanel';
import { TransactionForm } from '@/components/AddTransactionForm';

export function AddTransaction() {
  const [open, setOpen] = useState(false);

  return (
    <SideBarPanel
      title={'Add Transaction'}
      description={'Please fill up the form below to add a new transaction'}
      open={open}
      setOpen={setOpen}
    >
      <TransactionForm closeSheet={() => setOpen(false)} />
    </SideBarPanel>
  );
}
