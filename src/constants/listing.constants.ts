import { ComponentType } from "react";
import {
  Car,
  CableCarIcon as Elevator,
  TreePine,
  Thermometer,
  Snowflake,
  Heart,
  Wifi,
} from "lucide-react";

export const listingTypeConstants = [
  { value: "sale", label: "For Sale" },
  { value: "rent", label: "For Rent" },
];

export const propertyTypeConstants = [
  { value: "flat", label: "Flat" },
  { value: "house", label: "House" },
  { value: "villa", label: "Villa" },
  { value: "studio", label: "Studio" },
];

export const purposeConstants = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
];

export const furnishedConstants = [
  { value: "furnished", label: "Furnished" },
  { value: "semi_furnished", label: "Semi Furnished" },
  { value: "unfurnished", label: "Unfurnished" },
];

export const rentFrequencyConstants = [
  { value: "monthly", label: "Monthly" },
  { value: "half_yearly", label: "Half Yearly" },
  { value: "yearly", label: "Yearly" },
];

export interface ICheckboxOption {
  name: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
}

export const checkboxOptions: ICheckboxOption[] = [
  {
    name: "hasParking",
    label: "Parking Available",
    icon: Car,
  },
  {
    name: "hasLift",
    label: "Elevator/Lift",
    icon: Elevator,
  },
  {
    name: "hasBalcony",
    label: "Balcony",
    icon: TreePine,
  },
  {
    name: "heating",
    label: "Heating",
    icon: Thermometer,
  },
  {
    name: "cooling",
    label: "Air Conditioning",
    icon: Snowflake,
  },
  {
    name: "petFriendly",
    label: "Pet Friendly",
    icon: Heart,
  },
  {
    name: "internetIncluded",
    label: "Internet Included",
    icon: Wifi,
  },
];

export const months = [
  { value: "January", label: "January" },
  { value: "February", label: "February" },
  { value: "March", label: "March" },
  { value: "April", label: "April" },
  { value: "May", label: "May" },
  { value: "June", label: "June" },
  { value: "July", label: "July" },
  { value: "August", label: "August" },
  { value: "September", label: "September" },
  { value: "October", label: "October" },
  { value: "November", label: "November" },
  { value: "December", label: "December" },
];
