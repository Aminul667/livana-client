import { TProperty } from "@/schema/listing.schema";
import { TUserProfile } from "./user.types";

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

export type TPropertyDetails = TCardProperty & {
  amenities: string[];
  availableFrom: string;
  cooling: boolean;
  createdAt: string;
  depositAmount?: number;
  floorNumber: number;
  furnished: string;
  hasBalcony: boolean;
  hasLift: boolean;
  hasParking: boolean;
  heating: boolean;
  internetIncluded: boolean;
  latitude: number;
  longitude: number;
  maintenanceFee?: number;
  petFriendly: boolean;
  postalCode: string;
  purpose: string;
  rentFrequency?: string;
  totalFloors?: string;
  updatedAt: string;
  userId: string;
  videoUrl?: string;
  user: {
    email: string;
    id: string;
    profile: Partial<TUserProfile>;
  };
  images: {
    id: string;
    url: string;
  };
};
