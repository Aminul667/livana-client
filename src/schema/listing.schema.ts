/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

// Enums
export const listingTypeEnum = z.enum(["rent", "sale"]);
export const propertyTypeEnum = z.enum(["flat", "house", "villa", "studio"]);
export const purposeEnum = z.enum(["residential", "commercial"]);
// export const statusEnum = z.enum(["available", "rented", "sold"]);
export const furnishedStatusEnum = z.enum([
  "furnished",
  "semi_furnished",
  "unfurnished",
]);
export const rentFrequencyEnum = z.enum(["monthly", "half_yearly", "yearly"]);

// Helper function for required fields
function requiredString(message: string) {
  return z.string().min(1, { message });
}

// Main Schema
export const propertySchema = z.object({
  description: requiredString("Description is required"),
  price: z
    .number()
    .min(0, "Price must be greater than zero")
    .refine((val) => val > 0, "Price must be greater than zero"),

  listingType: listingTypeEnum,
  propertyType: propertyTypeEnum,
  purpose: purposeEnum,
  availableFrom: z
    .string()
    .optional()
    .refine((val) => val && val.trim().length > 0, {
      message: "Availability date is required",
    }),

  // Location
  address: requiredString("Address is required"),
  city: requiredString("City is required"),
  state: requiredString("State is required"),
  postalCode: requiredString("Postal code is required"),
  country: requiredString("Country is required"),
  latitude: z.preprocess((val) => {
    const num = Number(val);
    return isNaN(num) ? undefined : num;
  }, z.number().optional()),

  longitude: z.preprocess((val) => {
    const num = Number(val);
    return isNaN(num) ? undefined : num;
  }, z.number().optional()),

  // Details
  bedrooms: z.number().int().min(0, "Must be 0 or more"),
  bathrooms: z.number().int().min(0, "Must be 0 or more"),
  areaSqFt: z.number().positive("Area must be greater than zero"),
  floorNumber: z.number().int(),
  totalFloors: z.preprocess((val) => {
    const num = Number(val);
    return Number.isInteger(num) ? num : undefined;
  }, z.number().int().optional()),
  furnished: furnishedStatusEnum,

  // Rent Specific
  rentFrequency: rentFrequencyEnum.optional(),
  depositAmount: z.preprocess((val) => {
    const num = Number(val);
    return isNaN(num) ? undefined : num;
  }, z.number().positive("Must be greater than zero").optional()),

  maintenanceFee: z.preprocess((val) => {
    const num = Number(val);
    return isNaN(num) ? undefined : num;
  }, z.number().positive("Must be greater than zero").optional()),

  // Features
  amenities: z.array(z.string()).optional(),
  hasParking: z.boolean(),
  hasLift: z.boolean(),
  hasBalcony: z.boolean(),
  heating: z.boolean(),
  cooling: z.boolean(),
  petFriendly: z.boolean(),
  internetIncluded: z.boolean(),

  // Media
  images: z
    .array(
      z.custom<File>(
        (file) => {
          return (
            file instanceof File &&
            file.size <= MAX_FILE_SIZE &&
            file.type.startsWith("image/")
          );
        },
        {
          message: "Each file must be an image under 10MB",
        }
      )
    )
    .min(1, "At least one image is required")
    .max(10, "You can upload up to 10 images"),
  videoUrl: z.preprocess((val) => {
    if (typeof val !== "string" || val.trim() === "") return undefined;
    return val;
  }, z.string().url({ message: "Must be a valid video URL" }).optional()),
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
setEnumErrorMessage(furnishedStatusEnum, "Select a valid status");

export type TProperty = z.infer<typeof propertySchema>;
