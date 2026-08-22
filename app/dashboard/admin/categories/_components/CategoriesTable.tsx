"use client";

import { useState } from "react";
import { Pencil, Plus, Tag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import CategoryFormDialog from "./CategoryFormDialog";
import DeleteCategoryDialog from "./DeleteCategoryDialog";
import type { Category } from "@/types/category";

type Props = {
  categories: Category[];
};

export default function CategoriesTable({
  categories,
}: Props) {
  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Category | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          className="rounded-full"
          onClick={() => setCreateOpen(true)}
        >
          <Plus size={16} />
          Add Category
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
        {categories.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <Tag
              size={32}
              className="mb-3 text-muted-foreground/50"
            />

            <h3 className="text-lg font-semibold">No categories yet</h3>

            <p className="mt-2 text-muted-foreground">
              Add a category so landlords can classify their listings.
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="border-b border-border/70 bg-muted/40">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Name
                </th>

                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Created
                </th>

                <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category) => (
                <tr
                  key={category.id}
                  className="border-b border-border/70 last:border-none hover:bg-muted/30"
                >
                  <td className="px-6 py-4 font-medium">
                    {category.name}
                  </td>

                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {category.createdAt
                      ? new Date(category.createdAt).toLocaleDateString()
                      : "—"}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => setEditTarget(category)}
                        aria-label="Edit category"
                      >
                        <Pencil size={14} />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => setDeleteTarget(category)}
                        aria-label="Delete category"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <CategoryFormDialog
        open={createOpen}
        setOpen={setCreateOpen}
      />

      {editTarget && (
        <CategoryFormDialog
          open={!!editTarget}
          setOpen={(open) => {
            if (!open) setEditTarget(null);
          }}
          existingCategory={editTarget}
        />
      )}

      {deleteTarget && (
        <DeleteCategoryDialog
          categoryId={deleteTarget.id}
          categoryName={deleteTarget.name}
          open={!!deleteTarget}
          setOpen={(open) => {
            if (!open) setDeleteTarget(null);
          }}
        />
      )}
    </div>
  );
}
