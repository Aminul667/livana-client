/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import LCheckbox from "@/components/Shared/Form/LCheckbox";
import LFileUpload from "@/components/Shared/Form/LFileUpload";
import LInputField from "@/components/Shared/Form/LInputField";
import { LivanaForm } from "@/components/Shared/Form/LivanaForm";
import LSelectItem from "@/components/Shared/Form/LSelectItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  furnishedConstants,
  listingTypeConstants,
  propertyTypeConstants,
  purposeConstants,
  rentFrequencyConstants,
} from "@/constants/listing.constants";
import { getCurrentLocation } from "@/lib/utils";
import { propertySchema, TProperty } from "@/schema/listing.schema";
import {
  DollarSign,
  Home,
  MapPin,
  Square,
  CableCarIcon as Elevator,
  Car,
  TreePine,
  Thermometer,
  Snowflake,
  Heart,
  Camera,
} from "lucide-react";
import React from "react";

const AddProperty = () => {
  const onSubmit = (data: TProperty) => {
    console.log("Property data", data);
    alert(JSON.stringify(data, null, 2));
  };
  return (
    <>
      <LivanaForm<TProperty>
        schema={propertySchema}
        defaultValues={{
          hasParking: false,
          hasLift: false,
          hasBalcony: false,
          heating: false,
          cooling: false,
          petFriendly: false,
          internetIncluded: false,
        }}
        onSubmit={onSubmit}
        className="space-y-8"
      >
        {({ register, control, setValue, formState: { errors } }) => {
          const handleLocationPick = async () => {
            try {
              const { latitude, longitude } = await getCurrentLocation();
              setValue("latitude", latitude, { shouldValidate: true });
              setValue("longitude", longitude, { shouldValidate: true });
            } catch (error: any) {
              alert(error.message);
              console.error("Geolocation error:", error);
            }
          };

          return (
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
                    <LInputField
                      registerName="price"
                      type="number"
                      label="Price *"
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

                  {/* Get Current Location Button */}
                  <div className="flex justify-center">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleLocationPick}
                      // disabled={isGettingLocation}
                      className="border-[#819067] text-[#819067] hover:bg-[#819067] hover:text-white bg-transparent cursor-pointer"
                    >
                      {/* {isGettingLocation ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Getting Location...
                      </>
                    ) : (
                      <>
                        <MapPin className="w-4 h-4 mr-2" />
                        Get Current Location
                      </>
                    )} */}
                      Get Current Location
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Property Details */}
              <Card className="border-[#B1AB86]/30 shadow-xl bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-[#0A400C] flex items-center">
                    <Square className="w-5 h-5 mr-2 text-[#819067]" />
                    Property Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Bedrooms */}
                    <LInputField<TProperty>
                      registerName="bedrooms"
                      type="number"
                      label="Bedrooms *"
                      register={register}
                      errors={errors}
                      className="space-y-2"
                      inputClass="bg-white border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067]/20"
                      labelClass="text-sm font-medium text-[#0A400C] flex items-center"
                    />

                    {/* Bathrooms */}
                    <LInputField<TProperty>
                      registerName="bathrooms"
                      type="number"
                      label="Bathrooms *"
                      register={register}
                      errors={errors}
                      className="space-y-2"
                      inputClass="bg-white border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067]/20"
                      labelClass="text-sm font-medium text-[#0A400C] flex items-center"
                    />

                    {/* Area */}
                    <LInputField<TProperty>
                      registerName="areaSqFt"
                      type="number"
                      label="Area (sq ft) *"
                      register={register}
                      errors={errors}
                      className="space-y-2"
                      inputClass="bg-white border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067]/20"
                      labelClass="text-sm font-medium text-[#0A400C] flex items-center"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Floor Number */}
                    <LInputField<TProperty>
                      registerName="floorNumber"
                      type="number"
                      label="Floor Number *"
                      register={register}
                      errors={errors}
                      className="space-y-2"
                      inputClass="bg-white border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067]/20"
                      labelClass="text-sm font-medium text-[#0A400C] flex items-center"
                    />

                    {/* total Floors */}
                    <LInputField<TProperty>
                      registerName="totalFloors"
                      type="number"
                      label="Total Floors"
                      register={register}
                      errors={errors}
                      className="space-y-2"
                      inputClass="bg-white border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067]/20"
                      labelClass="text-sm font-medium text-[#0A400C] flex items-center"
                    />
                    {/* furnished options */}
                    <LSelectItem
                      registerName="furnished"
                      control={control}
                      label="Furnished Status"
                      placeholder="Select Status"
                      options={furnishedConstants}
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

              {/* Rent-Specific Details (Conditional) */}
              <Card className="border-[#B1AB86]/30 shadow-xl bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-[#0A400C] flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-[#819067]" />
                    Rental Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Rent Frequency */}
                    <LSelectItem
                      registerName="rentFrequency"
                      control={control}
                      label="Rent Frequency"
                      placeholder="Select an option"
                      options={rentFrequencyConstants}
                      errors={errors}
                      className="space-y-2"
                      labelClass="text-sm font-medium text-[#0A400C] mb-2"
                      triggerClass="w-full border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067]/20"
                      contentClass="bg-white border-[#B1AB86]/30"
                      itemClass="text-[#0A400C] hover:bg-[#B1AB86]/10"
                    />

                    {/* deposit amount */}
                    <LInputField
                      registerName="depositAmount"
                      type="number"
                      label="Deposit Amount"
                      register={register}
                      errors={errors}
                      className="space-y-2"
                      inputClass="bg-white border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067]/20"
                      labelClass="text-sm font-medium text-[#0A400C] flex items-center"
                    />

                    {/* maintenance fee */}
                    <LInputField
                      registerName="maintenanceFee"
                      type="number"
                      label="Maintenance Fee"
                      register={register}
                      errors={errors}
                      className="space-y-2"
                      inputClass="bg-white border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067]/20"
                      labelClass="text-sm font-medium text-[#0A400C] flex items-center"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Features & Amenities */}
              <Card className="border-[#B1AB86]/30 shadow-xl bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-[#0A400C] flex items-center">
                    <Home className="w-5 h-5 mr-2 text-[#819067]" />
                    Features & Amenities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Parking */}
                    <LCheckbox
                      name="hasParking"
                      control={control}
                      label="Parking Available"
                      icon={<Car className="w-4 h-4 text-[#819067]" />}
                      errors={errors}
                      checkboxClass="data-[state=checked]:bg-[#819067] data-[state=checked]:border-[#819067]"
                      labelClass="text-sm text-[#0A400C] flex items-center cursor-pointer"
                    />

                    {/* Lift */}
                    <LCheckbox
                      name="hasLift"
                      control={control}
                      label="Elevator/Lift"
                      icon={<Elevator className="w-4 h-4 text-[#819067]" />}
                      errors={errors}
                      checkboxClass="data-[state=checked]:bg-[#819067] data-[state=checked]:border-[#819067]"
                      labelClass="text-sm text-[#0A400C] flex items-center cursor-pointer"
                    />

                    {/* Balcony */}
                    <LCheckbox
                      name="hasBalcony"
                      control={control}
                      label="Balcony"
                      icon={<TreePine className="w-4 h-4 text-[#819067]" />}
                      errors={errors}
                      checkboxClass="data-[state=checked]:bg-[#819067] data-[state=checked]:border-[#819067]"
                      labelClass="text-sm text-[#0A400C] flex items-center cursor-pointer"
                    />

                    {/* heating */}
                    <LCheckbox
                      name="heating"
                      control={control}
                      label="Heating"
                      icon={<Thermometer className="w-4 h-4 text-[#819067]" />}
                      errors={errors}
                      checkboxClass="data-[state=checked]:bg-[#819067] data-[state=checked]:border-[#819067]"
                      labelClass="text-sm text-[#0A400C] flex items-center cursor-pointer"
                    />

                    {/* Cooling */}
                    <LCheckbox
                      name="cooling"
                      control={control}
                      label="Air Conditioning"
                      icon={<Snowflake className="w-4 h-4 text-[#819067]" />}
                      errors={errors}
                      checkboxClass="data-[state=checked]:bg-[#819067] data-[state=checked]:border-[#819067]"
                      labelClass="text-sm text-[#0A400C] flex items-center cursor-pointer"
                    />

                    {/* Pet Friendly */}
                    <LCheckbox
                      name="petFriendly"
                      control={control}
                      label="Pet Friendly"
                      icon={<Heart className="w-4 h-4 text-[#819067]" />}
                      errors={errors}
                      checkboxClass="data-[state=checked]:bg-[#819067] data-[state=checked]:border-[#819067]"
                      labelClass="text-sm text-[#0A400C] flex items-center cursor-pointer"
                    />

                    {/* Internet */}
                    <LCheckbox
                      name="internetIncluded"
                      control={control}
                      label="Internet Included"
                      icon={<Heart className="w-4 h-4 text-[#819067]" />}
                      errors={errors}
                      checkboxClass="data-[state=checked]:bg-[#819067] data-[state=checked]:border-[#819067]"
                      labelClass="text-sm text-[#0A400C] flex items-center cursor-pointer"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Media Upload */}
              <Card className="border-[#B1AB86]/30 shadow-xl bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-[#0A400C] flex items-center">
                    <Camera className="w-5 h-5 mr-2 text-[#819067]" />
                    Property Images & Video
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Image Upload */}
                  <LFileUpload
                    name="images"
                    control={control}
                    label="Property Images"
                    maxImages={10}
                    maxFileSizeMB={10}
                    errors={errors}
                  />

                  {/* Video URL */}
                  <LInputField
                    registerName="videoUrl"
                    label="Video URL (Optional)"
                    register={register}
                    errors={errors}
                    placeholder="https://youtube.com/watch?v=..."
                    className="space-y-2"
                    inputClass="bg-white border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067]/20"
                    labelClass="text-sm font-medium text-[#0A400C] flex items-center"
                  />
                </CardContent>
              </Card>

              <Button
                type="submit"
                className="w-full bg-[#819067] hover:bg-[#0A400C] text-white font-semibold py-3 transition-all duration-300 transform cursor-pointer"
              >
                Save and Preview
              </Button>
            </>
          );
        }}
      </LivanaForm>
    </>
  );
};

export default AddProperty;
