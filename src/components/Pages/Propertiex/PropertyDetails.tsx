import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TPropertyDetails } from "@/types/listing.types";
import { ChevronRight, Heart, MapPin, Share2, Star } from "lucide-react";
import Link from "next/link";
import React from "react";

const PropertyDetails = ({ property }: { property: TPropertyDetails }) => {
  console.log("From component", property);
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEFAE0] to-[#B1AB86]/20">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-[#819067] mb-6">
          <Link href="/" className="hover:text-[#0A400C]">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/properties" className="hover:text-[#0A400C]">
            Properties
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#0A400C] font-medium">{property.city}</span>
        </nav>

        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-[#819067] text-white hover:bg-[#0A400C] capitalize">
                    {property.listingType}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-white text-[#0A400C] capitalize"
                  >
                    {property.propertyType}
                  </Badge>
                  {property.isFeatured && (
                    <Badge className="bg-yellow-500 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-[#0A400C]">
                  {property.bedrooms > 0 ? `${property.bedrooms}-Bedroom ` : ""}
                  {property.propertyType.charAt(0).toUpperCase() +
                    property.propertyType.slice(1)}{" "}
                  in {property.city}
                </h1>
                <div className="flex items-center text-[#819067]">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.address}, {property.city}, {property.state}{" "}
                  {property.postalCode}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#819067] text-[#819067] hover:bg-[#819067] hover:text-white bg-transparent"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#819067] text-[#819067] hover:bg-[#819067] hover:text-white bg-transparent"
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="text-3xl font-bold text-[#0A400C]">
              ${property.price} / {property.rentFrequency}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
