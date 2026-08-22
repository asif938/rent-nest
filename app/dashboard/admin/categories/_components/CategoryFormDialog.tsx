"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { categorySchema, type CategoryInput } from "@/lib/validations/category";
import { createCategory, updateCategory } from "../_actions/categoryActions";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  existingCategory?: {
    id: string;
    name: string;
  };
};

export default function CategoryFormDialog({
  open,
  setOpen,
  existingCategory,
}: Props) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const isEditMode = !!existingCategory;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryInput>({
    resolver: zodResolver(categorySchema),
    values: {
      name: existingCategory?.name ?? "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setPending(true);

    const result = isEditMode
      ? await updateCategory(existingCategory.id, data.name)
      : await createCategory(data.name);

    setPending(false);

    if (result.success) {
      toast.success(result.message);
      setOpen(false);
      reset();
      router.refresh();
    } else {
      toast.error(result.message);
    }
  });

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Category" : "Add Category"}
          </DialogTitle>

          <DialogDescription>
            {isEditMode
              ? "Update this category's name."
              : "Create a new property category."}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={onSubmit}
          noValidate
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="category-name">Name</Label>

            <Input
              id="category-name"
              placeholder="Apartment"
              aria-invalid={!!errors.name}
              {...register("name")}
            />

            {errors.name && (
              <p className="text-sm text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full rounded-full"
            disabled={pending}
          >
            {pending ? "Saving..." : isEditMode ? "Save Changes" : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
