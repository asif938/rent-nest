// import { getReviews } from "../_actions/getReview";
import TestimonialCard from "./TestimonialCard";

// import { getReviews } from "@/lib/api/review";

export default async function Testimonials() {
    //   const reviews = await getReviews();

    const reviews = [
        {
            id: "1",
            rating: 5,
            comment:
                "The apartment was exactly as described. It was clean, spacious, and the landlord was very responsive. I had a wonderful stay and would definitely rent this property again.",
            createdAt: "2026-07-30T10:00:00.000Z",
            tenant: {
                id: "t1",
                name: "Sarah Ahmed",
                profilePhoto: null,
            },
            property: {
                id: "p1",
                title: "Modern Family Apartment",
            },
        },
        {
            id: "2",
            rating: 4,
            comment:
                "Great location with easy access to public transportation and nearby shops. The apartment was comfortable, though the Wi-Fi could have been a bit faster. Overall, a pleasant experience.",
            createdAt: "2026-07-28T14:30:00.000Z",
            tenant: {
                id: "t2",
                name: "John Williams",
                profilePhoto: null,
            },
            property: {
                id: "p2",
                title: "Cozy Downtown Studio",
            },
        },
        {
            id: "3",
            rating: 5,
            comment:
                "An excellent place to stay! The rooms were bright and well-maintained, and the neighborhood was quiet and safe. The check-in process was smooth, and the host was very friendly.",
            createdAt: "2026-07-25T09:15:00.000Z",
            tenant: {
                id: "t3",
                name: "Emily Johnson",
                profilePhoto: null,
            },
            property: {
                id: "p3",
                title: "Luxury City View Condo",
            },
        },
    ];


    if (!reviews.length) return null;

    return (
        <section className="bg-muted/30 py-20">
            <div className="container">

                <div className="mb-12 text-center">
                    <span className="text-sm font-medium tracking-wide text-primary uppercase">
                        Testimonials
                    </span>

                    <h2 className="mt-2 font-display text-3xl font-medium tracking-tight md:text-4xl">
                        What Our Tenants Say
                    </h2>

                    <p className="mt-3 text-muted-foreground">
                        Genuine reviews from people who rented through RentNest.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {reviews.map((review) => (
                        <TestimonialCard
                            key={review.id}
                            review={review}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}