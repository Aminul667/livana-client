/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

// Enums
export const listingTypeEnum = z.enum(["rent", "sale"]);
export const propertyTypeEnum = z.enum(["flat", "house", "villa", "studio"]);
export const purposeEnum = z.enum(["residential", "commercial"]);
export const statusEnum = z.enum(["available", "rented", "sold"]);
export const furnishedStatusEnum = z.enum([
  "furnished",
  "semi_furnished",
  "unfurnished",
]);
export const rentFrequencyEnum = z.enum(["monthly", "yearly"]);

// Helper function for required fields
function requiredString(message: string) {
  return z.string().min(1, { message });
}

// Main Schema
export const propertySchema = z.object({
  description: requiredString("Description is required"),
  price: z
    .number()
    .min(0, "Price must be greater than or equal to zero")
    .refine((val) => val > 0, "Price must be greater than zero"),

  listingType: listingTypeEnum,
  propertyType: propertyTypeEnum,
  purpose: purposeEnum,
  status: statusEnum,

  // Location
  address: requiredString("Address is required"),
  city: requiredString("City is required"),
  state: requiredString("State is required"),
  postalCode: requiredString("Postal code is required"),
  country: requiredString("Country is required"),
  latitude: z.number().optional(),
  longitude: z.number().optional(),

  // Details
  bedrooms: z.number().int().min(0, "Must be 0 or more"),
  bathrooms: z.number().int().min(0, "Must be 0 or more"),
  areaSqFt: z.number().positive("Area must be greater than zero"),
  floorNumber: z.number().int(),
  totalFloors: z.number().int().optional(),
  furnished: furnishedStatusEnum.optional(),

  // Rent Specific
  rentFrequency: rentFrequencyEnum.optional(),
  depositAmount: z.number().positive("Must be positive").optional(),

  // Features
  amenities: z.array(z.string()).optional(),
  hasParking: z.boolean(),
  hasLift: z.boolean(),
  hasBalcony: z.boolean(),
  heating: z.boolean(),
  cooling: z.boolean(),
  petFriendly: z.boolean(),
  internetIncluded: z.boolean(),
  maintenanceFee: z.number().positive("Must be positive").optional(),

  // Media
  images: z.array(z.string().url("Each image must be a valid URL")),
  videoUrl: z.string().url("Must be a valid video URL").optional(),
});

// Custom error messages for enums
const setEnumErrorMessage = (schema: any, message: string) => {
  schema._def.errorMap = () => ({ message });
};

setEnumErrorMessage(listingTypeEnum, "Listing type must be 'rent' or 'sale'");
setEnumErrorMessage(propertyTypeEnum, "Select a valid property type");
setEnumErrorMessage(
  purposeEnum,
  "Purpose must be 'residential' or 'commercial'"
);
setEnumErrorMessage(statusEnum, "Property status must be valid");

export type TProperty = z.infer<typeof propertySchema>;
