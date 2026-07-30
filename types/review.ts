export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt?: string;

  tenant: {
    id: string;
    name: string;
    profilePhoto?: string | null;
  };

  property: {
    id: string;
    title: string;
  };
}