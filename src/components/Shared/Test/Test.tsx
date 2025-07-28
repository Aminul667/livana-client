import React from "react";
import { LivanaForm } from "../Form/LivanaForm";
import { propertySchema, TProperty } from "@/schema/listing.schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, MapPin } from "lucide-react";
import LInputField from "../Form/LInputField";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";
import {
  listingTypeConstants,
  propertyTypeConstants,
  purposeConstants,
} from "@/constants/listing.constants";
import LSelectItem from "../Form/LSelectItem";
import { Button } from "@/components/ui/button";

const Test = () => {
  const onSubmit = (data: TProperty) => {
    console.log("Property data", data);
    alert(JSON.stringify(data, null, 2));
  };
  return (
    <>
      <h2>This is Test page</h2>
      <LivanaForm<TProperty>
        schema={propertySchema}
        // defaultValues={{ role: "" }}
        onSubmit={onSubmit}
        className="space-y-8"
      >
        {({ register, control, formState: { errors } }) => (
          <>
            {/* basic information */}
            <Card className="border-[#B1AB86]/30 shadow-xl bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#0A400C] flex items-center">
                  <Home className="w-5 h-5 mr-2 text-[#819067]" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-sm font-medium text-[#0A400C]"
                  >
                    Property Description *
                  </Label>
                  <Textarea
                    id="about"
                    {...register("description")}
                    className="bg-white border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067]/20 min-h-[120px]"
                    placeholder="Tell us about yourself..."
                  />
                  {errors?.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {String(errors.description?.message)}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Price */}
                  <LInputField<TProperty>
                    registerName="price"
                    type="number"
                    label="Price"
                    register={register}
                    errors={errors}
                    className="space-y-2"
                    inputClass="bg-white border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067]/20"
                    labelClass="text-sm font-medium text-[#0A400C] flex items-center"
                  />

                  {/* Listing Type */}
                  <LSelectItem
                    registerName="listingType"
                    control={control}
                    label="Listing Type *"
                    placeholder="Select your Listing Type"
                    options={listingTypeConstants}
                    errors={errors}
                    className="space-y-2"
                    labelClass="text-sm font-medium text-[#0A400C] mb-2"
                    triggerClass="w-full border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067]/20"
                    contentClass="bg-white border-[#B1AB86]/30"
                    itemClass="text-[#0A400C] hover:bg-[#B1AB86]/10"
                  />

                  {/* property type */}
                  <LSelectItem
                    registerName="propertyType"
                    control={control}
                    label="Property Type *"
                    placeholder="Select Property Type"
                    options={propertyTypeConstants}
                    errors={errors}
                    className="space-y-2"
                    labelClass="text-sm font-medium text-[#0A400C] mb-2"
                    triggerClass="w-full border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067]/20"
                    contentClass="bg-white border-[#B1AB86]/30"
                    itemClass="text-[#0A400C] hover:bg-[#B1AB86]/10"
                  />

                  {/* Purpose */}
                  <LSelectItem
                    registerName="purpose"
                    control={control}
                    label="Purpose *"
                    placeholder="Select Purpose"
                    options={purposeConstants}
                    errors={errors}
                    className="space-y-2"
                    labelClass="text-sm font-medium text-[#0A400C] mb-2"
                    triggerClass="w-full border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067]/20"
                    contentClass="bg-white border-[#B1AB86]/30"
                    itemClass="text-[#0A400C] hover:bg-[#B1AB86]/10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* location details */}
            <Card className="border-[#B1AB86]/30 shadow-xl bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#0A400C] flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-[#819067]" />
                  Location Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Address */}
                <LInputField<TProperty>
                  registerName="address"
                  label="Street Address *"
                  register={register}
                  errors={errors}
                  className="space-y-2"
                  inputClass="bg-white border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067]/20"
                  labelClass="text-sm font-medium text-[#0A400C] flex items-center"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* City */}
                  <LInputField<TProperty>
                    registerName="city"
                    label="City *"
                    register={register}
                    errors={errors}
                    className="space-y-2"
                    inputClass="bg-white border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067]/20"
                    labelClass="text-sm font-medium text-[#0A400C] flex items-center"
                  />

                  {/* City */}
                  <LInputField<TProperty>
                    registerName="state"
                    label="State *"
                    register={register}
                    errors={errors}
                    className="space-y-2"
                    inputClass="bg-white border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067]/20"
                    labelClass="text-sm font-medium text-[#0A400C] flex items-center"
                  />

                  {/* City */}
                  <LInputField<TProperty>
                    registerName="postalCode"
                    label="Postal Code *"
                    register={register}
                    errors={errors}
                    className="space-y-2"
                    inputClass="bg-white border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067]/20"
                    labelClass="text-sm font-medium text-[#0A400C] flex items-center"
                  />

                  {/* City */}
                  <LInputField<TProperty>
                    registerName="country"
                    label="Country *"
                    register={register}
                    errors={errors}
                    className="space-y-2"
                    inputClass="bg-white border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067]/20"
                    labelClass="text-sm font-medium text-[#0A400C] flex items-center"
                  />
                </div>

                {/* Coordinates (Optional) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Latitude */}
                  <LInputField<TProperty>
                    registerName="latitude"
                    type="number"
                    label="Latitude (Optional)"
                    register={register}
                    errors={errors}
                    className="space-y-2"
                    inputClass="bg-white border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067]/20"
                    labelClass="text-sm font-medium text-[#0A400C] flex items-center"
                  />

                  {/* Longitude */}
                  <LInputField<TProperty>
                    registerName="longitude"
                    type="number"
                    label="Longitude (Optional)"
                    register={register}
                    errors={errors}
                    className="space-y-2"
                    inputClass="bg-white border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067]/20"
                    labelClass="text-sm font-medium text-[#0A400C] flex items-center"
                  />
                </div>
              </CardContent>
            </Card>

            <Button
              type="submit"
              className="w-full bg-[#819067] hover:bg-[#0A400C] text-white font-semibold py-3 transition-all duration-300 transform hover:scale-105"
            >
              Submit
            </Button>
          </>
        )}
      </LivanaForm>
    </>
  );
};

export default Test;
