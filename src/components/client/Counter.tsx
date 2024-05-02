'use client';

import { Button } from '@/components/ui/button';
import { useSignal } from '@preact/signals-react';

export default function Counter() {
  const count = useSignal(0);
  return <Button onClick={() => (count.value += 1)}>Count is {count}</Button>;
}
