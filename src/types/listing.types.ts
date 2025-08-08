import { TProperty } from "@/schema/listing.schema";

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
