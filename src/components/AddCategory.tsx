'use client';
import { useTransition } from 'react';
import { addCategory, getCategories } from '@/actions';
import { computed, useSignal } from '@preact/signals-react';
import { TCategory } from '@/db/schema/transaction';
import { queryClient } from '@/provider/tanstack-provider/TanStackProvider';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

export function AddCategory() {
  const [pending, startTransition] = useTransition();
  const category = useSignal('');
  const error = useSignal('');

  const open = useSignal(false);
  const categories = useSignal<TCategory[]>([]);

  const getClientCategories = async () => {
    return await queryClient.fetchQuery({
      queryFn: async () => {
        return getCategories();
      },
      queryKey: ['categories'],
    });
  };

  return (
    <>
      {computed(() => (
        <Dialog
          open={open.value}
          onOpenChange={(value) => {
            open.value = value;
            if (!open.value) {
              category.value = '';
              error.value = '';
            }
          }}
        >
          <DialogTrigger asChild>
            <Button onClick={() => (open.value = true)} variant="outline">
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <div className="flex gap-x-2 items-center">
              <Label htmlFor="name" className="w-1/3">
                Category Name
              </Label>
              {computed(() => (
                <div className="flex flex-col gap-y-1 my-4 w-full">
                  <Input
                    value={category.value}
                    onChange={(event) => {
                      category.value = event.target.value;
                    }}
                    id="name"
                    defaultValue="Pedro Duarte"
                  />
                  <p className="text-red-500 text-[11px]">{error.value}</p>
                </div>
              ))}
            </div>
            <DialogFooter>
              {computed(() => (
                <Button
                  disabled={pending || category.value.length === 0}
                  onClick={() => {
                    startTransition(async () => {
                      categories.value = await getClientCategories();
                      error.value = '';
                      if (
                        categories.value.find(
                          (cat) => cat.categoryName === category.value,
                        )
                      ) {
                        error.value = 'Category already exists';
                      } else {
                        await addCategory(category.value);
                        await queryClient.invalidateQueries({
                          queryKey: ['categories'],
                        });
                        open.value = false;
                      }
                    });
                  }}
                >
                  {pending && (
                    <Loader2 className="animate-spin font-bold text-white dark:text-black mr-2 h-4 w-4" />
                  )}
                  <p>Add Category</p>
                </Button>
              ))}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </>
  );
}
