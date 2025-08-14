"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TPropertyDetails } from "@/types/listing.types";
import {
  Bath,
  Bed,
  Calendar,
  Check,
  ChevronRight,
  Heart,
  Home,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
  Square,
  Star,
  X,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import PhotoGallery from "./PhotoGallery";
import { Card, CardContent } from "@/components/ui/card";
import { checkboxOptions } from "@/constants/listing.constants";
import { Separator } from "@/components/ui/separator";

const PropertyDetails = ({ property }: { property: TPropertyDetails }) => {
  console.log("From component", property);
  const { images } = property;

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
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
                    {property.bedrooms > 0
                      ? `${property.bedrooms}-Bedroom `
                      : ""}
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

            {/* photo gallery */}
            <PhotoGallery images={images} propertyTitle="Property images" />

            {/* Key Details */}
            <Card className="border-[#B1AB86]/30 bg-white p-0">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-[#0A400C] mb-4">
                  Property Details
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {property.bedrooms > 0 && (
                    <div className="flex items-center space-x-2">
                      <Bed className="w-5 h-5 text-[#819067]" />
                      <div>
                        <div className="font-medium text-[#0A400C]">
                          {property.bedrooms}
                        </div>
                        <div className="text-sm text-[#819067]">Bedrooms</div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Bath className="w-5 h-5 text-[#819067]" />
                    <div>
                      <div className="font-medium text-[#0A400C]">
                        {property.bathrooms}
                      </div>
                      <div className="text-sm text-[#819067]">Bathrooms</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Square className="w-5 h-5 text-[#819067]" />
                    <div>
                      <div className="font-medium text-[#0A400C]">
                        {property.areaSqFt.toLocaleString()}
                      </div>
                      <div className="text-sm text-[#819067]">Sq Ft</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Home className="w-5 h-5 text-[#819067]" />
                    <div>
                      <div className="font-medium text-[#0A400C] capitalize">
                        {property.furnished.replace("_", " ")}
                      </div>
                      <div className="text-sm text-[#819067]">Furnished</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="border-[#B1AB86]/30 bg-white p-0">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-[#0A400C] mb-4">
                  Description
                </h2>
                <p className="text-[#0A400C]/80 leading-relaxed">
                  {property.description}
                </p>
              </CardContent>
            </Card>

            {/* Features & Amenities */}
            <Card className="border-[#B1AB86]/30 bg-white p-0">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-[#0A400C] mb-4">
                  Features & Amenities
                </h2>

                {/* Main Features */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {property.amenities.map((feature) => {
                    const match = checkboxOptions.find(
                      (opt) => opt.name === feature
                    );
                    if (!match) return null;

                    const Icon = match.icon;

                    return (
                      <div
                        key={match.name}
                        className="flex items-center space-x-3"
                      >
                        <div
                          className={`p-2 rounded-full ${
                            match.label ? "bg-green-100" : "bg-gray-100"
                          }`}
                        >
                          <Icon
                            className={`w-4 h-4 ${
                              match.label ? "text-green-600" : "text-gray-400"
                            }`}
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[#0A400C]">{match.label}</span>
                          {match.label ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <X className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Location Details */}
            <Card className="border-[#B1AB86]/30 bg-white">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-[#0A400C] mb-4">
                  Location
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[#819067]">Address:</span>
                    <span className="text-[#0A400C] font-medium">
                      {property.address}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#819067]">City:</span>
                    <span className="text-[#0A400C] font-medium">
                      {property.city}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#819067]">State:</span>
                    <span className="text-[#0A400C] font-medium">
                      {property.state}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#819067]">Postal Code:</span>
                    <span className="text-[#0A400C] font-medium">
                      {property.postalCode}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#819067]">Floor:</span>
                    <span className="text-[#0A400C] font-medium">
                      {property.floorNumber}
                      {property.totalFloors
                        ? ` of ${property.totalFloors}`
                        : ""}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="border-[#B1AB86]/30 bg-white sticky top-8">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-[#0A400C] mb-4">
                  Contact Information
                </h3>

                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#0A400C] mb-1">
                      {property.price} / {property.rentFrequency}
                    </div>
                    {property.listingType === "rent" && (
                      <div className="text-sm text-[#819067]">
                        {property.depositAmount && (
                          <div>
                            Deposit: ${property.depositAmount.toLocaleString()}
                          </div>
                        )}
                        {property.maintenanceFee && (
                          <div>Maintenance: ${property.maintenanceFee}/mo</div>
                        )}
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#819067]">Available From:</span>
                      <span className="text-[#0A400C] font-medium">
                        {property.availableFrom}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#819067]">Property ID:</span>
                      <span className="text-[#0A400C] font-medium">
                        #{property.id}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#819067]">Type:</span>
                      <span className="text-[#0A400C] font-medium capitalize">
                        {property.propertyType}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#819067]">Purpose:</span>
                      <span className="text-[#0A400C] font-medium capitalize">
                        {property.purpose}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Button className="w-full bg-[#819067] hover:bg-[#0A400C] text-white">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-[#819067] text-[#819067] hover:bg-[#819067] hover:text-white bg-transparent"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-[#819067] text-[#819067] hover:bg-[#819067] hover:text-white bg-transparent"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Viewing
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Property Stats */}
            <Card className="border-[#B1AB86]/30 bg-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-[#0A400C] mb-4">
                  Property Stats
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#819067]">Listed:</span>
                    <span className="text-[#0A400C]">2 days ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#819067]">Views:</span>
                    <span className="text-[#0A400C]">127</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#819067]">Inquiries:</span>
                    <span className="text-[#0A400C]">8</span>
                  </div>
                  {property.isFeatured && (
                    <div className="flex justify-between">
                      <span className="text-[#819067]">Status:</span>
                      <Badge className="bg-yellow-500 text-white text-xs">
                        Featured
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
