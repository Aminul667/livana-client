"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TCardProperty, TViewMode } from "@/types/listing.types";
import { Bath, Bed, Heart, MapPin, Square } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PropertyCard = ({
  property,
  viewMode,
}: {
  property: TCardProperty;
  viewMode: TViewMode;
}) => {
  //   const formatPrice = (property: Property) => {
  //     const price = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //       maximumFractionDigits: 0,
  //     }).format(property.price)

  //     if (property.listingType === "rent" && property.rentFrequency) {
  //       return `${price}/${property.rentFrequency === "monthly" ? "mo" : "yr"}`
  //     }
  //     return price
  //   }

  if (viewMode === "list") {
    return (
      <Card className="border-[#B1AB86]/30 bg-white hover:shadow-lg transition-all duration-300 group p-0">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            <div className="relative md:w-80 h-48 md:h-auto overflow-hidden">
              <Image
                src={
                  property.coverImage ||
                  "/placeholder.svg?height=200&width=320&query=property"
                }
                alt={`${property.propertyType} in ${property.city}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <Badge className="bg-[#819067] text-white hover:bg-[#0A400C] capitalize">
                  {property.listingType}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-white/90 text-[#0A400C] capitalize"
                >
                  {property.propertyType}
                </Badge>
                {property.isFeatured && (
                  <Badge className="bg-yellow-500 text-white">Featured</Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-3 right-3 bg-white/90 hover:bg-white text-[#819067] hover:text-[#0A400C] rounded-full p-2"
              >
                <Heart className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex-1 p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <Link href={`/properties/${property.id}`}>
                    <h3 className="text-xl font-semibold text-[#0A400C] group-hover:text-[#819067] transition-colors cursor-pointer">
                      {property.bedrooms > 0 ? `${property.bedrooms}-Bed ` : ""}
                      {property.propertyType.charAt(0).toUpperCase() +
                        property.propertyType.slice(1)}{" "}
                      in {property.city}
                    </h3>
                  </Link>
                  <p className="text-[#819067] flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.address}, {property.city}, {property.state}
                  </p>
                </div>
                <div className="text-2xl font-bold text-[#0A400C]">
                  {property.price}
                </div>
              </div>

              <p className="text-[#0A400C]/80 mb-4 line-clamp-2">
                {property.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-[#819067]">
                  {property.bedrooms > 0 && (
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      {property.bedrooms}
                    </div>
                  )}
                  <div className="flex items-center">
                    <Bath className="w-4 h-4 mr-1" />
                    {property.bathrooms}
                  </div>
                  <div className="flex items-center">
                    <Square className="w-4 h-4 mr-1" />
                    {property.areaSqFt.toLocaleString()} sq ft
                  </div>
                </div>

                <Link href={`/properties/${property.id}`}>
                  <Button className="bg-[#819067] hover:bg-[#0A400C] text-white">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-[#B1AB86]/30 bg-white hover:shadow-lg transition-all duration-300 group overflow-hidden p-0">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={
            property.coverImage ||
            "/placeholder.svg?height=200&width=400&query=property"
          }
          alt={`${property.propertyType} in ${property.city}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-[#819067] text-white hover:bg-[#0A400C] capitalize">
            {property.listingType}
          </Badge>
          <Badge
            variant="secondary"
            className="bg-white/90 text-[#0A400C] capitalize"
          >
            {property.propertyType}
          </Badge>
          {property.isFeatured && (
            <Badge className="bg-yellow-500 text-white">Featured</Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 bg-white/90 hover:bg-white text-[#819067] hover:text-[#0A400C] rounded-full p-2"
        >
          <Heart className="w-4 h-4" />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="mb-3">
          <Link href={`/properties/${property.id}`}>
            <h3 className="font-semibold text-[#0A400C] text-lg mb-1 group-hover:text-[#819067] transition-colors cursor-pointer">
              {property.bedrooms > 0 ? `${property.bedrooms}-Bed ` : ""}
              {property.propertyType.charAt(0).toUpperCase() +
                property.propertyType.slice(1)}{" "}
              in {property.city}
            </h3>
          </Link>
          <div className="flex items-center text-[#819067] text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            {property.address}, {property.city}
          </div>
        </div>

        <p className="text-[#0A400C]/80 text-sm mb-4 line-clamp-2">
          {property.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="text-xl font-bold text-[#0A400C]">
            {property.price}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-[#819067] mb-4">
          {property.bedrooms > 0 && (
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              {property.bedrooms} bed
            </div>
          )}
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            {property.bathrooms} bath
          </div>
          <div className="flex items-center">
            <Square className="w-4 h-4 mr-1" />
            {property.areaSqFt.toLocaleString()} sqft
          </div>
        </div>

        <Link href={`/properties/${property.id}`}>
          <Button className="w-full bg-[#819067] hover:bg-[#0A400C] text-white transition-colors">
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
