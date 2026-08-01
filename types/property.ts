export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Landlord {
  id: string;
  name: string;
  email: string;
  role: "LANDLORD";
  createdAt: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  amenities: string[];
  images: string[];
  isAvailable: boolean;

  landlordId: string;
  categoryId: string;

  createdAt: string;
  updatedAt: string;

  category: Category;
  landlord: Landlord;
  reviews: Review[];
}