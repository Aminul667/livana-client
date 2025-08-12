import { TProperty } from "@/schema/listing.schema";

export type TViewMode = "grid" | "list";

export type TCardProperty = {
  id: string;
  address: string;
  areaSqFt: number;
  bathrooms: number;
  bedrooms: number;
  city: string;
  country: string;
  coverImage: string;
  description: string;
  listingType: string;
  price: number;
  propertyType: string;
  state: string;
  isFeatured: boolean;
  status: string;
};

export interface IAddListingResponse {
  success: boolean;
  message: string;
  data: TProperty & {
    id: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  };
}
