"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export type PropertyReview = {
  id: string;
  rating: number;
  comment: string;
  tenant: {
    id: string;
    name: string;
  };
  createdAt: string;
};

export type PropertyReviewsResponse = {
  propertyId: string;
  averageRating: number;
  totalReviews: number;
  reviews: PropertyReview[];
};

export async function getPropertyReviews(
  propertyId: string
): Promise<PropertyReviewsResponse> {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/reviews/property/${propertyId}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return {
      propertyId,
      averageRating: 0,
      totalReviews: 0,
      reviews: [],
    };
  }

  const result = await res.json();

  return result.data;
}

export type ReviewActionState = {
  success: boolean;
  message: string;
};

export async function createReview(
  propertyId: string,
  rating: number,
  comment: string
): Promise<ReviewActionState> {
  const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/reviews`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ propertyId, rating, comment }),
      cache: "no-store",
    }
  );

  const result = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: result.message || "Failed to submit review.",
    };
  }

  revalidatePath("/dashboard/tenant/rentals");

  return {
    success: true,
    message: result.message || "Review submitted successfully.",
  };
}

export async function updateReview(
  reviewId: string,
  rating: number,
  comment: string
): Promise<ReviewActionState> {
  const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/reviews/${reviewId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ rating, comment }),
      cache: "no-store",
    }
  );

  const result = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: result.message || "Failed to update review.",
    };
  }

  revalidatePath("/dashboard/tenant/rentals");

  return {
    success: true,
    message: result.message || "Review updated successfully.",
  };
}

export async function deleteReview(
  reviewId: string
): Promise<ReviewActionState> {
  const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/reviews/${reviewId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  const result = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: result.message || "Failed to delete review.",
    };
  }

  revalidatePath("/dashboard/tenant/rentals");

  return {
    success: true,
    message: result.message || "Review deleted successfully.",
  };
}
