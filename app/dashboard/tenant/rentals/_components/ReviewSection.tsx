import { DetailCard } from "@/app/dashboard/_components/DetailCard";
import { getMe } from "@/lib/getMe";
import { getPropertyReviews } from "../_actions/reviewActions";
import LeaveReviewButton from "./LeaveReviewButton";
import YourReviewCard from "./YourReviewCard";

type Props = {
  propertyId: string;
};

export default async function ReviewSection({
  propertyId,
}: Props) {
  const [user, { reviews }] = await Promise.all([
    getMe(),
    getPropertyReviews(propertyId),
  ]);

  const myReview = user
    ? reviews.find((review) => review.tenant.id === user.id)
    : undefined;

  return (
    <DetailCard
      id="review"
      title="Your Review"
    >
      {myReview ? (
        <YourReviewCard
          propertyId={propertyId}
          review={myReview}
        />
      ) : (
        <div className="space-y-3">
          <p className="text-muted-foreground">
            Your rental is complete — let other tenants know how it went.
          </p>

          <LeaveReviewButton propertyId={propertyId} />
        </div>
      )}
    </DetailCard>
  );
}
