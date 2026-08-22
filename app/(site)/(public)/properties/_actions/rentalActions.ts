"use server";

import { cookies } from "next/headers";

export type RentalRequestState = {
    success: boolean;
    message: string;
    errors?: Record<string, string>;
};

export async function createRentalRequest(
    propertyId: string,
    prevState: RentalRequestState | null,
    formData: FormData
): Promise<RentalRequestState> {
    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");

    const accessToken = (await cookies()).get("accessToken")?.value;

    if (!accessToken) {
        return {
            success: false,
            message: "Please login first.",
        };
    }

    const payload = {
        propertyId,
        startDate,
        endDate,
    };

    try {
        const res = await fetch(
            `${process.env.BACKEND_API_URL}/api/rentals`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(payload),
                cache: "no-store",
            }
        );

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message:
                    result.message || "Failed to submit rental request.",
            };
        }

        return {
            success: true,
            message:
                result.message || "Rental request submitted successfully.",
        };
    } catch {
        return {
            success: false,
            message: "Something went wrong. Please try again.",
        };
    }
}