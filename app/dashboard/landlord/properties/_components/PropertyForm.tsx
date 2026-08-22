"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { propertySchema, type PropertyInput } from "@/lib/validations/property";
import {
  createProperty,
  updateProperty,
} from "../_actions/propertyActions";
import TagInput from "./TagInput";
import ImageUrlInput from "./ImageUrlInput";
import type { Category } from "@/types/category";

type EditableProperty = {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  categoryId: string;
  amenities: string[];
  images: string[];
};

type Props = {
  categories: Category[];
  property?: EditableProperty;
};

export default function PropertyForm({
  categories,
  property,
}: Props) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const isEditMode = !!property;

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<PropertyInput>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: property?.title ?? "",
      description: property?.description ?? "",
      price: property?.price ?? undefined,
      location: property?.location ?? "",
      categoryId: property?.categoryId ?? "",
      amenities: property?.amenities ?? [],
      images: property?.images ?? [],
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setPending(true);

    const result = isEditMode
      ? await updateProperty(property.id, data)
      : await createProperty(data);

    setPending(false);

    if (result.success) {
      toast.success(result.message);
      router.push("/dashboard/landlord/properties");
      router.refresh();
    } else {
      toast.error(result.message);

      result.errorDetails?.forEach((detail) => {
        if (detail.field in propertySchema.shape) {
          setError(detail.field as keyof PropertyInput, {
            message: detail.message,
          });
        }
      });
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-8"
    >
      <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
        <h2 className="mb-5 text-lg font-semibold">Basic Information</h2>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>

            <Input
              id="title"
              placeholder="Cozy 2BR Apartment"
              aria-invalid={!!errors.title}
              {...register("title")}
            />

            {errors.title && (
              <p className="text-sm text-destructive">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>

            <Textarea
              id="description"
              placeholder="Describe the property..."
              className="min-h-32"
              aria-invalid={!!errors.description}
              {...register("description")}
            />

            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price">Monthly Rent</Label>

              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="1200"
                aria-invalid={!!errors.price}
                {...register("price", { valueAsNumber: true })}
              />

              {errors.price && (
                <p className="text-sm text-destructive">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>

              <Input
                id="location"
                placeholder="Dhaka, Bangladesh"
                aria-invalid={!!errors.location}
                {...register("location")}
              />

              {errors.location && (
                <p className="text-sm text-destructive">
                  {errors.location.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Category</Label>

            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value ?? "")}
                >
                  <SelectTrigger
                    className="w-full"
                    aria-invalid={!!errors.categoryId}
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>

                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            {errors.categoryId && (
              <p className="text-sm text-destructive">
                {errors.categoryId.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
        <h2 className="mb-5 text-lg font-semibold">Amenities</h2>

        <Controller
          name="amenities"
          control={control}
          render={({ field }) => (
            <TagInput
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
        <h2 className="mb-1 text-lg font-semibold">Photos</h2>

        <p className="mb-5 text-sm text-muted-foreground">
          Add image URLs for this property.
        </p>

        <Controller
          name="images"
          control={control}
          render={({ field }) => (
            <ImageUrlInput
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        {errors.images && (
          <p className="mt-2 text-sm text-destructive">
            {errors.images.message}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          className="rounded-full"
          onClick={() => router.back()}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          className="rounded-full"
          disabled={pending}
        >
          {pending
            ? "Saving..."
            : isEditMode
              ? "Save Changes"
              : "Create Property"}
        </Button>
      </div>
    </form>
  );
}
